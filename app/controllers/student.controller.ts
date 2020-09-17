import { Controller } from "./controller";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Response } from "../models/HTTPModels";
import Student, { IStudent } from "../models/Student";
import Subject from "../models/Subject";
import { Error } from "mongoose";
import { CastError } from "mongoose";

export class StudentController extends Controller {
  constructor() {
    super();
  }
  async create(event: APIGatewayProxyEvent): Response {
    try {
      let item = JSON.parse(event.body!).Item;
      const student = await new Student(item).save();
      return this.okResponse(student);
    } catch (err) {
      console.log("Error", err);
      return this.errorResponse(err);
    }
  }

  async get(event: APIGatewayProxyEvent): Response {
    try {
      let item: IStudent | null = await Student.findOne({
        _id: event.pathParameters!.id,
      });
      await item
        ?.populate([{ path: "subjects", model: Subject }])
        .execPopulate();
      if (item == null) {
        return this.notFound();
      }
      let requiredLessons = await Subject.find({ isRequired: true });
      item?.subjects.push(...requiredLessons);
      return this.okResponse(item);
    } catch (err) {
      console.log("Error", err);
      return this.errorResponse(err);
    }
  }

  async getAll(event: APIGatewayProxyEvent): Response {
    try {
      let item = Student.find();
      let populatedItem = await item
        .populate([{ path: "subjects", model: Subject }])
        .exec();
      let requiredSubjects = await Subject.find({ isRequired: true });
      populatedItem.map((student) =>
        student.subjects.push(...requiredSubjects)
      );
      return this.okResponse(item);
    } catch (err) {
      console.log("Error", err);
      return this.errorResponse(err);
    }
  }
  // POST /student/by_name
  // Body {
  // "Item":{
  //          "last_name": string
  //          "group": string
  //          }
  // }
  async getByName(event: APIGatewayProxyEvent): Response {
    try {
      let student_name = JSON.parse(event.body!).Item.last_name;
      console.log("Name", student_name);
      // Later I will add group and it must be here
      let item = await Student.findOne({ lastName: student_name }).exec();
      if (item === null) {
        return this.notFound();
      }
      return this.okResponse(item);
    } catch (err) {
      console.log("Error", err);
      return this.errorResponse(err);
    }
  }
  async update(event: APIGatewayProxyEvent): Response {
    try {
      let updated = JSON.parse(event.body!).Item;
      let item: IStudent | null = await Student.findOneAndUpdate(
        { _id: event.pathParameters!.id },
        { $set: updated },
        { new: true }
      );
      if (item == null) {
        return this.notFound();
      }
      return this.okResponse(updated);
    } catch (err) {
      console.log("Error", err);
      return this.errorResponse(err);
    }
  }

  async remove(event: APIGatewayProxyEvent): Response {
    try {
      let item = await Student.findByIdAndDelete(event.pathParameters!.id);
      return this.okResponse({});
    } catch (err) {
      // @ts-ignore
      console.log("Error", err);
      return this.errorResponse(err);
    }
  }

  // // Method for preview
  // // And this shit not working
  // async getByLastName(event: APIGatewayProxyEvent): Response{
  //     try{
  //         let requestedName = event.pathParameters!.name
  //         console.log(requestedName)
  //         let item: IStudent[] | null = await Student.find({lastName: requestedName})
  //         console.log("Item: ", item)
  //         if (item === null) {
  //             return this.notFound()
  //         }
  //         item.map( async item=> await item?.populate([{path: "lessons", model: Subject}]).execPopulate())
  //         let requiredLessons = await Subject.find({isRequired: true})
  //         item.map( item=>item?.lessons.push(...requiredLessons ) )
  //
  //         return this.okResponse(item)
  //     }catch(err){
  //         console.log("Error", err)
  //         return this.errorResponse(err)
  //     }
  // }
}
