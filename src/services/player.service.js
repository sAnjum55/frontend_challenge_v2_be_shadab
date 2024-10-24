import {
    deletePlayerQuery,
    findPlayerByFileIdQuery,
    listPlayerByFileIdQuery,
    updatePlayerQuery
} from "../database/queries.js";
import {client, startConnection, closeConnection} from "../config/dbConfig.js";
import {ApiError} from "../helpers/errorHandler.js";


export async function updatePlayer(player){
    await startConnection();
    try {
        const playerId = player.id;
        const currentPlayer = await findPlayerByFileIdQuery(client, playerId);
        if (!currentPlayer) {
            throw new ApiError(`Could not find Player with id ${playerId}`);
        }
        const updatedPlayer = Object.assign(currentPlayer, player)
        await updatePlayerQuery(client, updatedPlayer);
        closeConnection();
        return 'Player successfully updated!';
    } catch (error) {
        closeConnection();
        if (error?.code === '23505') {
            if (error?.detail.includes('jerseyNumber')) {
                throw new ApiError(`Duplicated Jersey Number`, 409);
            }
        }
        console.error(error);
        throw error;
    }
}

export async function listPlayersByFileId(fileId) {
    await startConnection();
    try {
        const response = await  listPlayerByFileIdQuery(client, fileId);
        closeConnection();
        return response
    } catch (error) {
        console.error(error);
        closeConnection();
        throw error;
    }
}

export async function deletePlayer(playerId) {
    await startConnection();
    try {
        await deletePlayerQuery(client, playerId);
        closeConnection();
        return 'Player successfully removed!';
    } catch (error) {
        closeConnection();
        console.error(error);
        throw error;
    }
}