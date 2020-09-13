import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {ILesson, LessonObject} from "./Lesson";


// Default body parameter is object, like dictionary
// Here we delete this object and use generic, which we can define by yourself


export type Response = Promise<APIGatewayProxyResult>;

export interface TimeTable {
    [Key: string]: Day
}

interface Day{
    [Key: string]: ILesson[]
}

