import {Controller} from "./controller";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Response, TimeTable} from "../models/HTTPModels";
import {getStudentId} from "../utils/utils";
import Student from "../models/Student";
import Subject from "../models/Subject";
import Lesson, {ILesson} from "../models/Lesson";


export class TimetableController extends Controller {
    constructor() {
        super();
    }

    async getTimetable(event: APIGatewayProxyEvent): Response {
        try {
            // Get user id from headers
            let studentId = getStudentId(event.headers)
            console.log("Student Id", studentId)
            // Get all subjects from user
            let user = await Student.findById(studentId).populate([{path: "subjects", model: Subject}]).exec()
            //Adding required lessons
            let requiredLessons = await Subject.find({isRequired: true})
            user?.subjects.push(...requiredLessons)
            // Get all lessons to this users
            console.log(user)
            let lessons_selected: ILesson[] = []
            await Promise.all(user?.subjects.map(
                async subject => {
                    let lesson = await Lesson.find({subject: subject}).populate({
                        path: "subject",
                        model: Subject
                    }).exec()
                    console.log("lesson : ", lesson)
                    lessons_selected.push(...lesson)
                })!)
            console.log("lessons_selected :", lessons_selected)
            // Group lessons by days and sort by time
            let timeTable = this.createTimetable(lessons_selected)
            console.log("timeTable : ", timeTable)
            return this.okResponse(timeTable);
        } catch (err) {
            console.log("Error", err)
            return this.errorResponse(err)
        }
    }

    // ПЕРЕПИСАТЬ ЭТО ПИЗДЕЦ
    private createTimetable(lessons_selected: ILesson[]) {
        let lessons_sorted: TimeTable = {}
        for (let week = 1; week < /*Number of weeks++*/ 3; week++) {
            lessons_sorted[week] = {}
            for (let day = 1; day < /*Number of days++*/7; day++) {
                let lessons_by_this_day = lessons_selected.filter(lesson => lesson.week === week && lesson.dayOfWeek === day)
                lessons_sorted[week][day] = lessons_by_this_day;
            }
        }
        return lessons_sorted
    }
}
