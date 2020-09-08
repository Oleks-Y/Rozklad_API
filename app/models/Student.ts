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
    id : string;
    first_name : string;
    secondName : string;
    lessons : [ILesson['_id']];
}

const StudentSchema : Schema = new Schema({
    id : {type : String, required : true, unique : true},
    firstName : {type : String, required : true},
    secondName : {type : String, required : true},
    lessons : [{ ref : 'lessons', type : Schema.Types.ObjectId}]
})

export default mongoose.model<IStudent>("Student", StudentSchema)
