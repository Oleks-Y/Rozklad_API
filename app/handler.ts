// file with all routes

import {LessonController} from "./controllers/lesson.controller";
import {Context} from "aws-lambda";
import {StudentController} from "./controllers/student.controller";

// Lessons

export const add_lesson = async (event: any, context: Context) => new LessonController().create(event)

export const get_lesson =  async (event: any, context: Context) => new LessonController().get(event)

export const update_lesson = async(event : any, context: Context) => new LessonController().update(event)

export const getAll = async (event: any, context: Context) => new LessonController().getAll(event)

// Students

export const create_student = async(event: any, context: Context) => new StudentController().create(event)

export const get_student = async(event: any, context: Context)=> new StudentController().get(event)

export const getAll_students = async(event: any, context: Context)=> new StudentController().getAll(event)

export const update_student = async(event: any, context: Context)=> new StudentController().update(event)

export const remove_student = async(event: any, context: Context)=> new StudentController().remove(event)


