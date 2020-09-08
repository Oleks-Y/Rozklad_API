import * as mongoose from "mongoose";
import {MONGODB} from "../utils/keys";
import {getResponseHeaders} from "../utils/utils";

export class Controller {
    constructor() {
        mongoose.connect(MONGODB)
            .then(()=> console.log("MongoDB connected succesfullt"))
            .catch(error=> console.log(error))
    }

    async okResponse(body : any) {
        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: JSON.stringify(body)
        }
    }

    async errorResponse(err: any) {
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error",
            }),
        };
    }

    async notFound(){
        return {
            statusCode: 404,
            headers: getResponseHeaders(),
            body:""
        };
    }
}
