// file with all routes

import {LessonController} from "./controllers/lesson.controller";
import {Context} from "aws-lambda";

let lessons = new LessonController()

export const add_lesson = async (event: any, context: Context) => lessons.create(event)

export const get_lesson =  async (event: any, context: Context) => lessons.get(event)

export const update_lesson = async(event : any, context: Context) => lessons.update(event)

export const getAll = async (event: any, context: Context) => lessons.getAll(event)
