import { NextFunction, Request, Response } from "express";
import { userHttp } from "../../util/axios/user";
import { InternalError, NotAuthorized } from "../../util/error";
import FormData from "form-data";


export default async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) return next(new NotAuthorized({}))
    try {
        let form = new FormData();
        let fileOptions = { ...req.file }
        for (let key in req.body) {
            form.append(key, req.body[key])
        };
        delete fileOptions.fieldname;
        delete fileOptions.buffer;
        fileOptions.filename = `${req.username}.${req.file.originalname.split('.')[1]}`;
        form.append('profile', req.file.buffer, fileOptions);
        let response = await userHttp.post('/user/', form, { headers: form.getHeaders() });
        let { data } = response;
        return res.status(200).json(data);
    } catch (e) {
        if (e.response) return res.status(e.response.status).json(e.response.data);
        return next(new InternalError({ message: 'there was an error with user service response' }))
    }
}