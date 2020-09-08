// export class Student {
//     id : string;
//     first_name : string;
//     secondName : string;
//     lessons : number[]
// }
import { Schema, Document} from "mongoose"
import {ILesson} from "./Lesson";
import * as mongoose from "mongoose";

export interface IStudent extends Document {

    firstName : string;
    lastName : string;
    lessons : [ILesson['_id']];
}

export interface Student{

    firstName : string;
    lastName : string;
    lessons : [ILesson['_id']];
}

const StudentSchema : Schema = new Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    lessons : [{ ref : 'lessons', type : Schema.Types.ObjectId}]
})

export default mongoose.model<IStudent>("Student", StudentSchema)
