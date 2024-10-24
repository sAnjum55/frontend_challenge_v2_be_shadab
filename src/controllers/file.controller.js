import {ApiError} from "../helpers/errorHandler.js";
import Joi from "joi";
import * as fileService from "../services/file.service.js";

export async function create(req, res, next) {
    try {
        if (!req.file) {
            throw new ApiError('No file found', 400);
        }
        const response = await fileService.create(
            req.file,
            req.body.fileName
        )
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function updateFileName(req, res, next) {
    try {
       const bodySchema = Joi.object({
            fileName: Joi.string().required(),
            fileId: Joi.string().uuid().required(),
        })
        const { error: bodyError } = bodySchema.validate(req.body);
        if (bodyError) {
            throw new ApiError(bodyError?.message, 400);
        }
        const response = await fileService.updateFileName(
            req.body.fileId,
            req.body.fileName
        )
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function listFiles(req, res, next) {
    try {
        const response = await fileService.listFiles()
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function deleteFile(req, res, next) {
    try {
        const schema = Joi.object({
            fileId: Joi.string().uuid().required(),
        })
        const { error: error } = schema.validate(req.params);
        if (error) {
            throw new ApiError(error?.message, 400);
        }
        const response = await fileService.deleteFile(
            req.params.fileId
        )
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}