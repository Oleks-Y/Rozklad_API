// file with all routes

import {SubjectController} from "./controllers/subject.controller";
import {Context} from "aws-lambda";
import {StudentController} from "./controllers/student.controller";

// subjects

export const add_subject = async (event: any, context: Context) => new SubjectController().create(event)

export const get_subject =  async (event: any, context: Context) => new SubjectController().get(event)

export const update_subject = async(event : any, context: Context) => new SubjectController().update(event)

export const get_all = async (event: any, context: Context) => new SubjectController().getAll(event)

export const remove_subject = async (event: any, context: Context) => new SubjectController().remove(event)

// Students

export const create_student = async(event: any, context: Context) => new StudentController().create(event)

export const get_student = async(event: any, context: Context)=> new StudentController().get(event)

export const getAll_students = async(event: any, context: Context)=> new StudentController().getAll(event)

export const update_student = async(event: any, context: Context)=> new StudentController().update(event)

export const remove_student = async(event: any, context: Context)=> new StudentController().remove(event)

export const get_student_by_name = async(event: any, context: Context)=> new StudentController().getByLastName(event)


