import { NextFunction, Request, Response } from "express";
import { authHttp } from "../../util/axios/auth";
import { InternalError } from "../../util/error";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response = await authHttp.post('/register', req.body);
        return res.json(response.data);
    } catch (e) {
        if (e.response) return res.status(e.response.status).json(e.response.data);
        return next(new InternalError({ message: 'there was an error with user service response' }))
    }
}
