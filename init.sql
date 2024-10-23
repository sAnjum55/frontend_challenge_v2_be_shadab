CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS import_file (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"fileName" varchar NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_IMPORT_FILE" PRIMARY KEY (id),
	CONSTRAINT "UQ_FILE_NAME" UNIQUE ("fileName")
);

CREATE TABLE IF NOT EXISTS "player" (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"playerName" varchar NOT NULL,
	"playerImg" varchar NOT NULL,
	"jerseyNumber" int NOT NULL,
	"position" varchar NOT NULL,
	"height" float8 NULL,
	"weight" float8 NULL,
	"nationality" varchar NOT NULL,
	"flagImg" varchar NOT NULL,
	"starter" bool NOT NULL DEFAULT false,
	"appearances" int NOT NULL,
	"minutesPlayed" int NOT null DEFAULT 0,
	"goals" int null,
	"assists" int null,
	"cleanSheets" int null,
	"saves" int null,
	"fileId" uuid NOT null,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_PLAYER_DETAILS" PRIMARY KEY (id),
	CONSTRAINT "UQ_JERSEY_NUMBER" UNIQUE ("jerseyNumber", "fileId"),
	CONSTRAINT "FK_IMPORT_FILE" FOREIGN KEY ("fileId") REFERENCES import_file(id) ON DELETE CASCADE
);