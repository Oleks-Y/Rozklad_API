import { APIGatewayProxyEvent } from "aws-lambda";

export function getResponseHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
  };
}

export function getStudentId(headers: { [p: string]: string }) {
  return headers.student_id;
}
