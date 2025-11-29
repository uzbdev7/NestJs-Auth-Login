import { HttpException } from "@nestjs/common";

export class ErrorMessages extends HttpException{
    constructor(message:string, statusCode:number){
        super(message,statusCode)
    }
}