import { NextFunction, Request, Response } from "express";
import { userHttp } from "../../util/axios/user";
import { BadRequest, InternalError } from "../../util/error";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            let response = await userHttp.get('/user');
            let { data } = response;
            if (data) return res.json(data);
        } else {
            return next(new BadRequest({ message: "not authenticated" }));
        }
    } catch (e) {
        if (e.response) {
            return res.status(e.response.status).json(e.response.data);
        }
        return next(new InternalError({ message: 'there was an error with user service response' }))
    }
}