import Lesson, {ILesson, LessonObj} from "../models/Lesson";
import {Response} from "../models/HTTPModels";
import {Controller} from "./controller";
import {APIGatewayProxyEvent} from "aws-lambda";

export class LessonController extends Controller {
    constructor() {
        super();
    }

    // body : {
    // "Item": {
    //      // Lesson here
    //      }
    //  }
    async create(event: APIGatewayProxyEvent): Response {
        try {
            let item: LessonObj = JSON.parse(event.body!).Item;
            const lesson = await new Lesson(item).save()
            return this.okResponse(lesson)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }

    async get(event: APIGatewayProxyEvent): Response {
        try {
            let item: ILesson | null = await Lesson.findById(event.pathParameters!.id)
            if (item == null) {
                return this.notFound()
            }
            return this.okResponse(item);
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }

    async update(event: APIGatewayProxyEvent): Response {

        try {
            let updated = JSON.parse(event.body!).Item
            const item = await Lesson.findOneAndUpdate(
                {_id: event.pathParameters!.id},
                {$set: updated},
                {new: true}
            )
            return this.okResponse(updated)
        } catch (err) {
            console.log(err)
            return this.errorResponse(err)
        }
    }

    async remove(event: APIGatewayProxyEvent) : Response{
        throw new Error("Not implemented.Remove lesson and remove lesson_id from student")

    }

    async getAll(event: APIGatewayProxyEvent): Response {
        try {
            const lessons = await Lesson.find({})
            return this.okResponse(lessons)
        } catch (err) {
            console.log(err)
            return this.errorResponse(err)
        }
    }


}
