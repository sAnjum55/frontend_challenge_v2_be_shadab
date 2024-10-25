# Frontend challenge (Backend)

## Project Overview


## Prerequisites
Make sure you have the following installed on your local machine:
- **Docker**: v20.10 or higher
- **Docker Compose**: v1.29 or higher

## Setup and Installation

### Step 1: Clone the repository
```bash
git clone https://github.com/your-repo-name/nodejs-docker-rest-api.git
cd nodejs-docker-rest-api
```

### Step 2: Run app using docker
**Start the app**

Option 1
```bash
npm run start:docker
```

Option 2
```bash
docker-compose up -d
```

**Stop the app**

Option 1
```bash
npm run stop:docker
```

Option 2
```bash
docker-compose down
```

## Accessing the API
Once the app is running, you can access the REST API via:
`http://localhost:5001`

### Available endpoints
| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/api/file`             | List of imported roster files      |
| GET    | `/api/roster/:fileId`   | List of players inside roster file |
| POST   | `/api/roster`           | Upload roster file                 |
| PATCH  | `/api/file`             | Update file name                   |
| DELETE | `/api/file/:fileId`     | Delete file by Id                  |
| PATCH  | `/api/roster`          | Update player details              |
| DELETE | `/api/roster/:playerId` | Remove player                      |

### Requests
#### GET `http://localhost:5001/api/file`

**Response**
```
[
  {
  "id": "8d094fb6-66ae-4ce5-b122-4e20850aef77",
  "fileName": "psg-roster - players",
  "createdAt": "2024-10-23T19:09:55.388Z"
  },
  . . . more
]
```

#### GET `http://localhost:5001/api/roster/:fileId`

**Response**
```
[
    {
        "fileId": "8d094fb6-66ae-4ce5-b122-4e20850aef77",
        "fileName": "psg-roster - players",
        "createdAt": "2024-10-23T19:09:55.388Z",
        "players": [
            {
                "id": "60bd1771-ff98-4681-a6e4-8baf9f317478",
                "goals": null,
                "saves": 76,
                "fileId": "8d094fb6-66ae-4ce5-b122-4e20850aef77",
                "height": 185,
                "weight": 80,
                "assists": null,
                "flagImg": "https://cdn-icons-png.flaticon.com/512/197/197506.png",
                "starter": true,
                "position": "Goalkeeper",
                "createdAt": "2024-10-23T19:09:55.388324",
                "playerImg": "https://images.psg.media/media/33317/card_21-22_navas.png?center=0.5,0.5&mode=crop&width=400&height=600",
                "updatedAt": "2024-10-23T19:09:55.388324",
                "playerName": "Keylor Navas",
                "appearances": 26,
                "cleanSheets": 10,
                "nationality": "Costa Rican",
                "jerseyNumber": 1,
                "minutesPlayed": 2308
            },
            . . . more
        ]
    } 
]
```

#### GET `http://localhost:5001/api/file`

**Response**
```
[
  {
  "id": "8d094fb6-66ae-4ce5-b122-4e20850aef77",
  "fileName": "psg-roster - players",
  "createdAt": "2024-10-23T19:09:55.388Z"
  }
]
```

#### POST `http://localhost:5001/api/file`

**Body**
```
formdata
file: filename.csv
```

**Response**
```
"File added successfully!"
```

#### PATCH `http://localhost:5001/api/file`

**Body**
```
{
 "fileName": string  * Required
 "fileId": string  * Required
}
```

**Response**
```
"File name successfully updated!"
```


#### DELETE `http://localhost:5001/api/file/:fileId`
**Response**
```
"Player successfully removed!"
```

#### PATCH  `http://localhost:5001/api/roster`
**Body**
```
{
    "id": string,  * Required
    "playerName": string,
    "playerImg": string,
    "jerseyNumber": number,
    "position": string,
    "height": number,
    "weight": number,
    "nationality": string,
    "flagImg": string,
    "starter": boolean,
    "appearances": number,
    "minutesPlayed": number,
    "goals": number,
    "assists": number,
    "cleanSheets": number,
    "saves": number,
}
```

**Response**
```
"Player successfully updated!"
```

#### DELETE `http://localhost:5001/api/roster/:playerId`
**Response**
```
"Player successfully removed!"
```
