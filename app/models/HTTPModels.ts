import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {ISubject, LessonObj} from "./Subject";


// Default body parameter is object, like dictionary
// Here we delete this object and use generic, which we can define by yourself
export type HttpEventRequestWithBody<T = null> = Omit<APIGatewayProxyEvent, 'body'> & {
    body : T
}
export type LessonCreateRequest = HttpEventRequestWithBody<{ Item: LessonObj}>

export type Response = Promise<APIGatewayProxyResult>;
