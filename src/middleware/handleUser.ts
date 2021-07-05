import { NextFunction, Request, Response } from "express"
import { authHttp } from "../util/axios/auth";
export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        let headers = { ...req.headers }
        try {
            let response = await authHttp.get('/currentUser', { headers })
            let { data } = response;
            let { authorization } = response.headers;
            if (authorization) res.set("Authorization", authorization)
            if (data.result) req.user = data.result;
            return next()
        } catch (e) {
            return next();
        }
    };
    return next();
}