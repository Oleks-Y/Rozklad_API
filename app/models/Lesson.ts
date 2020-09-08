// import {ZoomConference} from "./ZoomConference";
//
// export class Lesson {
//     lesson_id : number;
//     name : string;
//     teachers : string[];
//     lessonsZoom: ZoomConference[];
//     labsZoom : ZoomConference[];
//     dayOfWeek: number;
//     numberOfLesson: number;
//     week: number;
// }

import {Document, Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface ILesson extends Document {
    // lesson_id : ;
    name: string;
    teachers: string[];
    lessonsZoom: any[];
    labsZoom: any[];
    dayOfWeek: number;
    numberOfLesson: number;
    week: number;
}
export interface LessonObj{
    name: string;
    teachers: string[];
    lessonsZoom: any[];
    labsZoom: any[];
    dayOfWeek: number;
    numberOfLesson: number;
    week: number;
}

const LessonSchema: Schema = new Schema({
    name: {type: String, required: true},
    teachers: [{type: String}],
    lessonsZoom: [{
        url : {type: String},
        accessCode : {type: String}
    }],
    labsZoom: [{
        url : {type: String},
        accessCode : {type: String}
    }],
    dayOfWeek : {type : Number},
    numberOfLesson: {type : Number},
    week : {type : Number},
})

export default mongoose.model<ILesson>("Lesson", LessonSchema)
