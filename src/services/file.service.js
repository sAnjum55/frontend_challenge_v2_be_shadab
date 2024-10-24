import * as fs from "fs";
import csvParser from "csv-parser";
import {ApiError} from "../helpers/errorHandler.js";
import {
    insertFileQuery,
    insertPlayerQuery,
    listFilesQuery,
    updateFileNameQuery,
    deleteFileQuery,
} from "../database/queries.js";
import {client, closeConnection, startConnection} from "../config/dbConfig.js";

const _listValidFields = [
    "Player Name",
    "Player Image",
    "Jersey Number",
    "Position",
    "Height",
    "Weight",
    "Nationality",
    "Flag Image",
    "Starter",
    "Appearances",
    "Minutes Played",
    "Goals ",
    "Assists",
    "Clean Sheets",
    "Saves"
]

function _validateHeaderFields(listKeys) {
    const missing = _listValidFields.filter(x => !listKeys.includes(x))
    if (missing && missing.length > 0) {
        throw new ApiError(`Missing fields ${missing}`, 404);
    }
}

async function _insert(fileName, listData) {
    await startConnection();
    let response = {};

    try {
        await client.query('BEGIN');
        const fileId = await insertFileQuery(client, fileName);
        for await (const data of listData) {
            data.fileId = fileId;
            await insertPlayerQuery(client, data);
        }
        await client.query('COMMIT');
        response.failed = false
    } catch (error) {
        await client.query('ROLLBACK');
        response.failed = true;
        response.error = error;
    } finally {
        client.release();
    }
    return response;
}

export async function create(file) {
    try {
        file.originalname = Buffer.from(file.originalname, 'ascii').toString('utf8');
        //Validate if jersey number is duplicated
        const csvData = await new Promise ((resolve, reject) => {
            const result = []
            fs.createReadStream(file.path)
            .pipe(csvParser())
            .on('data', (data) => result.push(data))
            .on('end', () => {
                console.log('CSV file successfully processed:');
                resolve(result);
            })
            .on('error', (err) => {
                console.error('Error reading the CSV file:', err);
                reject(err);
            });
        })
        const headers = Object.keys(csvData[0]);
        _validateHeaderFields(headers);
        const response = await _insert(file.originalname.split('.')[0], csvData);
        if (response.failed) {
            throw response.error
        }
        return 'File added successfully!';
    } catch (error) {
        if (error?.code === '23505') {
            if (error?.detail.includes('fileName')) {
                throw new ApiError(`File already exists`, 409);
            }
            if (error?.detail.includes('jerseyNumber')) {
                throw new ApiError(`Duplicated Jersey Number`, 409);
            }
        }
        console.error(error);

        throw error;
    }
}

export async function updateFileName(fileId, fileName) {
    await startConnection()
    try {
        await updateFileNameQuery(client, fileId, fileName);
        closeConnection();
        return 'File name successfully updated!';
    } catch (error) {
        closeConnection();
        if (error?.code === '23505') {
            if (error?.detail.includes('fileName')) {
                throw new ApiError(`File already exists`, 409);
            }
            if (error?.detail.includes('jerseyNumber')) {
                throw new ApiError(`Duplicated Jersey Number`, 409);
            }
        }
        console.error(error);

        throw error;
    }
}

export async function listFiles() {
    await startConnection()
    try {
        const response = await listFilesQuery(client);
        closeConnection();
        return response;
    } catch (error) {
        closeConnection();
        console.error(error);
        throw error;
    }
}

export async function deleteFile(fileId) {
    await startConnection();
    try {
        await deleteFileQuery(client, fileId);
        closeConnection();
        return 'File successfully removed!';
    } catch (error) {
        closeConnection();
        console.error(error);
        throw error;
    }
}