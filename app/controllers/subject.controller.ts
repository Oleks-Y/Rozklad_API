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
    //      // Subject here
    //      }
    //  }
    async create(event: APIGatewayProxyEvent): Response {
        try {
            let item: SubjectObject = JSON.parse(event.body!).Item;
            const subject = await new Subject(item).save()
            return this.okResponse(subject)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

    async get(event: APIGatewayProxyEvent): Response {
        try {
            let item: ISubject | null = await Subject.findById(event.pathParameters!.id)
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
            const item = await Subject.findOneAndUpdate(
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
                {Subjects: {$elemMatch: {id}}},
                {$pullAll: {Subjects: [id]}})
            return this.okResponse("")
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)

        }
    }

    // Add error handling to inccorrect id
    async getAll(event: APIGatewayProxyEvent): Response {
        try {
            const subjects = await Subject.find({})
            return this.okResponse(subjects)
        } catch (err) {
            console.log(err)
            return this.errorResponse(err)
        }
    }


}
