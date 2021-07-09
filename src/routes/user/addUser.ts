import { NextFunction, Request, Response } from "express";
import { userHttp } from "../../util/axios/user";
import { BadRequest, InternalError, NotAuthorized } from "../../util/error";
import FormData from "form-data";
import { roleHttp } from "../../util/axios/role";


export default async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) return next(new NotAuthorized({}))
    try {
        let roleResponse = await roleHttp.get('/', { params: { name: req.body.role } })
        if (roleResponse.data.result.length != 1) return next(new BadRequest({ message: 'no role found with provided name' }))
        let form = getFormData(req.body);
        let fileOptions: any = getFileOption(req.file);
        fileOptions.filename = getFileName(req.username, fileOptions.originalname);
        form.append('profile', req.file.buffer, fileOptions);
        let response = await userHttp.post('/user/', form, { headers: form.getHeaders() });
        let { data } = response;
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        if (e.response) return res.status(e.response.status).json(e.response.data);
        return next(new InternalError({ message: 'there was an error with user service response' }))
    }
}

const getFormData = (body: any) => {
    let form = new FormData();
    for (let key in body) form.append(key, body[key]);
    return form;
}

const getFileOption = (fileDetails: any) => {
    let fileOptions = { ...fileDetails };
    delete fileOptions.fieldname;
    delete fileOptions.buffer;
    return fileOptions;
}

const getFileName = (username: string, originalname: string): string => {
    return `${username}.${originalname.split('.')[1]}`;
}