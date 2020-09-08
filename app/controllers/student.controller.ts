import {Controller} from "./controller";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Response} from "../models/HTTPModels";
import Student, {IStudent} from "../models/Student";
import Lesson from "../models/Lesson";

export class StudentController extends Controller {
    constructor() {
        super()
    }

    async create(event: APIGatewayProxyEvent): Response {
        try {
            let item = JSON.parse(event.body!).Item;
            const student = await new Student(item).save();
            return this.okResponse(student);
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }

    async get(event: APIGatewayProxyEvent): Response {
        try {
            let item: IStudent | null = await Student.findOne({_id: event.pathParameters!.id})
            let populatedItem = await item?.populate([{path: "lessons", model: Lesson}]).execPopulate()

            if (item == null) {
                return this.notFound()
            }
            return this.okResponse(populatedItem)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }

    }

    async getAll(event: APIGatewayProxyEvent): Response {
        try {
            let item = Student.find()
            let populatedItem = await item.populate([{path: "lessons", model: Lesson}]).exec()

            if (item == null) {
                return this.notFound()
            }
            return this.okResponse(populatedItem)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }

    }

    async update(event: APIGatewayProxyEvent): Response {
        try {
            let updated = JSON.parse(event.body!).Item
            let item: IStudent | null = await Student.findOneAndUpdate(
                {_id: event.pathParameters!.id},
                {$set: updated},
                {new: true})
            if (item == null) {
                return this.notFound()
            }
            return this.okResponse(updated)
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }

    async remove(event: APIGatewayProxyEvent): Response {
        try {
            let item = await Student.findByIdAndDelete(event.pathParameters!.id)
            return this.okResponse({})
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }
}
