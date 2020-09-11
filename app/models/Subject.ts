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

export interface ISubject extends Document {
    // lesson_id : ;
    name: string;
    teachers: string[];
    lessonsZoom: any[];
    labsZoom: any[];
    isRequired: boolean;
}
export interface SubjectObject{
    name: string;
    teachers: string[];
    lessonsZoom: any[];
    labsZoom: any[];
    isRequired: boolean;
}

const SubjectSchema: Schema = new Schema({
    name: {type: String, required: true},
    teachers: {type: String},
    lessonsZoom: [{
        url : {type: String},
        accessCode : {type: String}
    }],
    labsZoom: [{
        url : {type: String},
        accessCode : {type: String}
    }],
    isRequired : {type: Boolean}
})
// Todo іншу колекцію з парами, де буде посилання на дисципліну
export default mongoose.model<ISubject>("Subject", SubjectSchema)
