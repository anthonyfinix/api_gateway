import { NextFunction, Request, Response } from "express";
import { userHttp } from "../../util/axios/user";
import { InternalError } from "../../util/error";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response = await userHttp.post('/user/', req.body);
        let { data } = response;
        return res.status(200).json(data);
    } catch (e) {
        if (e.response) {
            return res.status(e.response.status).json(e.response.data);
        }
        return next(new InternalError({ message: 'there was an error with user service response' }))
    }
}