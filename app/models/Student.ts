// export class Student {
//     id : string;
//     first_name : string;
//     secondName : string;
//     lessons : number[]
// }
import { Schema, Document} from "mongoose"
import {ISubject} from "./Subject";
import * as mongoose from "mongoose";

export interface IStudent extends Document {

    firstName : string;
    lastName : string;
    subjects : [ISubject['_id']];
}
// Todo додати групу

export interface Student{

    firstName : string;
    lastName : string;
    subjects : [ISubject['_id']];
}

const StudentSchema : Schema = new Schema({
    // Todo must be unique
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    // Todo Rename to subjects
    subjects : [{ ref : 'subjects', type : Schema.Types.ObjectId}]
})

export default mongoose.model<IStudent>("Student", StudentSchema)
