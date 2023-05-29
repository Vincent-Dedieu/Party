
-- On démarre une transaction afin de s'assurer de la cohérence gloabale de la BDD
BEGIN;

-- D'abord on supprime les table 'si elle existe"
DROP TABLE IF EXISTS "user", "item", "event", "category", "event_has_user";

-- Ensuite on la (re)crée

/* Première table : User */

CREATE TABLE "user" (
  -- on utilise le nouveau type qui est un standart SQL alors que SERIAL est un pseudo-type de PG
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "mail" VARCHAR(64) NOT NULL DEFAULT '',
  "lastname" VARCHAR(64) NOT NULL DEFAULT '',
  "firstname" VARCHAR(64) NOT NULL DEFAULT '',
  "password" VARCHAR(255) NOT NULL,
  "image" TEXT NOT NULL DEFAULT '', 
  -- pour avoir la date et l'heure on utilise le type "timestamp", et pour être le plus précis possible on utilisera plutôt le type "timestampz" qui contient en plus de la date et de l'heure le fuseau horaire défini dans les locales du serveur
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

/* 2ème table : Category */

CREATE TABLE "category" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(64) NOT NULL DEFAULT '',   
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

/* 3ème table : Event */

CREATE TABLE "event" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" VARCHAR(64) NOT NULL DEFAULT '',
  "date" DATE NOT NULL DEFAULT '2022-12-15',
  "description" TEXT NOT NULL DEFAULT '',
  "address" VARCHAR(64) NOT NULL DEFAULT '',
  "city" VARCHAR(64) NOT NULL DEFAULT '',
  "postal" INTEGER NOT NULL DEFAULT 0,
  "image" TEXT NOT NULL DEFAULT '',  
  "user_id" INTEGER  REFERENCES "user"(id) ON DELETE CASCADE,
  "password" VARCHAR(64) DEFAULT '',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

/* 4ème table : Item */

CREATE TABLE "item" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(64) NOT NULL DEFAULT '',
  "quantity" INTEGER NOT NULL DEFAULT 0,
  "user_id" INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "category_id" INTEGER NOT NULL REFERENCES "category"(id) ON DELETE CASCADE,
  "event_id" INTEGER NOT NULL REFERENCES "event"(id) ON DELETE CASCADE,    
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);







/* Table de liaison ! */

CREATE TABLE "event_has_user" (
  "event_id" INTEGER NOT NULL REFERENCES "event"(id) ON DELETE CASCADE,
  "user_id" INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
  -- ici pas d'updated_at car une relation ne se met pas à jour, soit on l'ajoute soit on la supprime
);



COMMIT;
