import {valueFormater} from "../helpers/formater.js";

export async function insertPlayerQuery(client, playerValues) {
    const insertPlayerQuery = `
        INSERT INTO player
        ("playerName", "playerImg", "jerseyNumber", "position", height, weight, nationality, "flagImg", starter, appearances, "minutesPlayed", goals, assists, "cleanSheets", saves, "fileId")
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING id;
    `;

    const _playerValues = [
        valueFormater(playerValues['Player Name']),
        valueFormater(playerValues['Player Image']),
        valueFormater(playerValues['Jersey Number']),
        valueFormater(playerValues['Position']),
        valueFormater(playerValues['Height']),
        valueFormater(playerValues['Weight']),
        valueFormater(playerValues['Nationality']),
        valueFormater(playerValues['Flag Image']),
        valueFormater(playerValues['Starter']),
        valueFormater(playerValues['Appearances']),
        valueFormater(playerValues['Minutes Played']),
        valueFormater(playerValues['Goals ']),
        valueFormater(playerValues['Assists']),
        valueFormater(playerValues['Clean Sheets']),
        valueFormater(playerValues['Saves']),
        valueFormater(playerValues['fileId']),
    ]
    await client.query(insertPlayerQuery, _playerValues);

}

export async function insertFileQuery(client, fileName) {
    const insertFileQuery = `
        INSERT INTO import_file
        ("fileName")
        VALUES
        ($1)
        RETURNING id;
    `;
    const values = [fileName];
    const res1 = await client.query(insertFileQuery, values);
    return res1.rows[0].id;

}

export async function updateFileNameQuery(client, fileId, fileName) {
    const query = `
        UPDATE import_file
        SET "fileName"=$2
        WHERE id = $1
    `;
    const values = [fileId, fileName];
    await client.query(query, values);
}

export async function listFilesQuery(client) {
    const query = `select id, "fileName", "createdAt" from import_file; `;
    const values = [];
    const response = await client.query(query, values);
    return response.rows;

}

export async function deleteFileQuery(client, fileId) {
    const query = `DELETE FROM import_file WHERE "id"=$1;`;
    const values = [fileId];
    await client.query(query, values);
}

export async function findPlayerByFileIdQuery(client, playerId) {
    const query = `
        select *  from player
        where id = $1
    `;
    const values = [playerId];
    const response = await client.query(query, values);
    return response.rows.at(0);
}

export async function listPlayerByFileIdQuery(client, fileId) {
    const query = `
        select if1.id as "fileId", if1."fileName", if1."createdAt", jsonb_agg(p.*) as "players" from player p 
        inner join import_file if1 on p."fileId" = if1.id
        where "fileId" = $1
        group by if1.id;
    `;
    const values = [fileId];
    const response = await client.query(query, values);
    return response.rows;
}

export async function updatePlayerQuery(client, player) {
    const query =`
        UPDATE player
        SET
        "playerName"= $2,
        "playerImg"= $3,
        "jerseyNumber"= $4,
        "position"= $5,
        height= $6,
        weight= $7,
        nationality= $8,
        "flagImg"= $9,
        starter= $10,
        appearances= $11,
        "minutesPlayed"= $12,
        goals= $13,
        assists= $14,
        "cleanSheets"= $15,
        saves= $16,
        "updatedAt"=now()
        WHERE id=$1;
    `;
    const values = [player['id'], player['playerName'], player['playerImg'], player['jerseyNumber'], player['position'],
        player['height'], player['weight'], player['nationality'], player['flagImg'], player['starter'], player['appearances'],
        player['minutesPlayed'], player['goals'], player['assists'], player['cleanSheets'], player['saves']];
    await client.query(query, values);
}

export async function deletePlayerQuery(client, playerId) {
    const query = `DELETE FROM player WHERE "id"=$1;`;
    const values = [playerId];
    await client.query(query, values);
}