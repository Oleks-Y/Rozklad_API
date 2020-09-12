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

export default mongoose.model<ISubject>("Subject", SubjectSchema)
