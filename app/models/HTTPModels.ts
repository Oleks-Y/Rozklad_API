import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";


// Default body parameter is object, like dictionary
// Here we delete this object and use generic, which we can define by yourself


export type Response = Promise<APIGatewayProxyResult>;
