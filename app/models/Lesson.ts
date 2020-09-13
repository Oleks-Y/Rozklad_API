import {Document, Schema} from "mongoose";
import {ISubject} from "./Subject";
import * as mongoose from "mongoose";
import DateTimeFormat = Intl.DateTimeFormat;
import {Stream} from "stream";

// Todo додати групу
export interface ILesson extends Document{
    subject: ISubject['_id'];
    // 1 or 2
    week : number;
    dayOfWeek: number;
    // numberOfLesson: number;
    timeStart: Date;
    type: "Лек" | "Лаб";
}

export interface LessonObject{
    subject: ISubject['_id'];
    week : number;
    dayOfWeek: number;
    // numberOfLesson: number;
    timeStart: Date;
    type: "Лек" | "Лаб";
}

const LesssonSchema : Schema = new Schema({
    subject : {type : Schema.Types.ObjectId, ref : "subjects", required: true},
    week : {type: Number, required : true, enum: [1,2]},
    dayOfWeek: {type: Number, required : true, min:1, max: 7},
    timeStart : {type: String, validate: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/},
    type: {type: String, enum:["Лек","Лаб"]}

})

export default mongoose.model<ILesson>("Lesson", LesssonSchema)


