import {ApiError} from "../helpers/errorHandler.js";
import Joi from "joi";
import * as playerService from "../services/player.service.js";
import {json} from "express";

export async function updatePlayer(req, res, next) {
    try {
       const bodySchema = Joi.object({
            id: Joi.string().uuid().required(),
           "playerName": Joi.string().allow(null).allow(''),
           "playerImg": Joi.string().allow(null).allow(''),
           "jerseyNumber": Joi.number().allow(null),
           "position": Joi.string().allow(null).allow(''),
           height: Joi.number().allow(null),
           weight: Joi.number().allow(null),
           nationality: Joi.string().allow(null).allow(''),
           "flagImg": Joi.string().allow(null).allow(''),
           starter: Joi.boolean().allow(null),
           appearances: Joi.number().allow(null),
           "minutesPlayed": Joi.number().allow(null),
           goals: Joi.number().allow(null),
           assists: Joi.number().allow(null),
           "cleanSheets": Joi.number().allow(null),
           saves: Joi.number().allow(null),
        })
        const { error: bodyError } = bodySchema.validate(req.body);
        if (bodyError) {
            throw new ApiError(bodyError?.message, 400);
        }
        const response = await playerService.updatePlayer(
            req.body
        )
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function listPlayersByFile(req, res, next) {
    try {
        const schema = Joi.object({
            fileId: Joi.string().uuid().required(),
        })
        const { error: error } = schema.validate(req.params);
        if (error) {
            throw new ApiError(error?.message, 400);
        }
        const response = await playerService.listPlayersByFileId(req.params.fileId)
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function deletePlayer(req, res, next) {
    try {
        const schema = Joi.object({
            playerId: Joi.string().uuid().required(),
        })
        const { error: error } = schema.validate(req.params);
        if (error) {
            throw new ApiError(error?.message, 400);
        }
        const response = await playerService.deletePlayer(
            req.params.playerId
        )
        return res.json(response);

    } catch (error) {
        console.error(error);
        next(error);
    }
}