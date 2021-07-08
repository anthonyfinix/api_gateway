import { NextFunction, Request, Response } from "express";
import { userHttp } from "../../util/axios/user";
import { InternalError, NotAuthorized } from "../../util/error";


export default async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) return next(new NotAuthorized({}))
    try {
        let response = await userHttp.get('/user');
        let { data } = response;
        if (data) return res.json(data);
    } catch (e) {
        if (e.response) {
            return res.status(e.response.status).json(e.response.data);
        }
        return next(new InternalError({ message: 'there was an error with user service response' }))
    }
}