import {Controller} from "./controller";
import {Response} from "../models/HTTPModels";
import {APIGatewayProxyEvent} from "aws-lambda";
import Lesson, {ILesson, LessonObject} from "../models/Lesson";
import Subject from "../models/Subject";

export class LessonController extends Controller {
    constructor() {
        super()
    }

    // POST lesson
    // body: LessonObject
    async create(event: APIGatewayProxyEvent): Response {
        try {
            let item: LessonObject = JSON.parse(event.body!).Item;
            const lesson = await new Lesson(item).save()
            return this.okResponse(lesson)
        } catch (err) {
            console.log(err)
            return this.errorResponse(err)
        }
    }

    // GET lesson/{id}
    async get(event: APIGatewayProxyEvent): Response {
        try {
            let item: ILesson | null = await Lesson.findById(event.pathParameters!.id)
            await item?.populate({path: "subject", model: Subject}).execPopulate()
            if (item == null) {
                return this.notFound()
            }
            return this.okResponse(item);
        } catch (err) {
            console.log(err)
            return this.errorResponse(err)
        }
    }

    // UPDATE lesson/{id}
    async update(event: APIGatewayProxyEvent): Response {
        let updated = JSON.parse(event.body!).Item
        try {
            const item = await Lesson.findOneAndUpdate(
                {_id: event.pathParameters!.id},
                {$set: updated},
                {new: true}
            ).populate({path: "subject", model: Subject}).exec()
            if (item == null) {
                return this.notFound()
            }

            return this.okResponse(item);
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }

    // DELETE lesson/{id}
    async remove(event: APIGatewayProxyEvent): Response {
        try {
            let id: string = event.pathParameters!.id;
            let item = await Lesson.findOneAndDelete({_id: id})
            return this.okResponse("")
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

    // GET lesson
    async getAll(event: APIGatewayProxyEvent): Response {
        try {
            let lessons: ILesson[] = await Lesson.find()
                .populate({path: "subject", model: Subject})
                .exec()
            console.log(lessons)
            return this.okResponse(lessons);
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

}
