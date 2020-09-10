import Lesson from "../models/Subject";
import Subject, {ISubject, SubjectObject} from "../models/Subject";
import {Response} from "../models/HTTPModels";
import {Controller} from "./controller";
import {APIGatewayProxyEvent} from "aws-lambda";
import Student from "../models/Student";
import {Error} from "mongoose";


export class SubjectController extends Controller {
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
            let item: SubjectObject = JSON.parse(event.body!).Item;
            const lesson = await new Lesson(item).save()
            return this.okResponse(lesson)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

    async get(event: APIGatewayProxyEvent): Response {
        try {
            let item: ISubject | null = await Lesson.findById(event.pathParameters!.id)
            if (item == null) {
                return this.notFound()
            }
            return this.okResponse(item);
        } catch (err) {
            console.log("Error", err.statusCode)
            return this.errorResponse(err)
        }
    }

    async update(event: APIGatewayProxyEvent): Response {
        let updated = JSON.parse(event.body!).Item
        try {
            const item = await Lesson.findOneAndUpdate(
                {_id: event.pathParameters!.id},
                {$set: updated},
                {new: true}
            )
            return this.okResponse(updated)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

    async remove(event: APIGatewayProxyEvent): Response {
        // remove subject and all reffs
        try {
            let id: string = event.pathParameters!.id
            let item = await Subject.findOneAndDelete({_id: id})
            await Student.updateMany(
                {lessons: {$elemMatch: {id}}},
                {$pullAll: {lessons: [id]}})
            return this.okResponse("")
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

    // Add error handling to inccorrect id
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
