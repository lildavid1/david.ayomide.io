CREATE TABLE "registrants"(
        "id" SERIAL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "full_name" TEXT UNIQUE NOT NULL,
        "username" TEXT NOT NULL UNIQUE,
        "hash" TEXT NOT NULL,
         "wallet" NUMERIC NOT NULL DEFAULT 1000.00,
         "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         "token" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "products"
 (
    "id" SERIALEGER PRIMARY KEY,
    "title" TEXT NOT NULL UNIQUE,
    "img" TEXT NOT NULL ,
    "desc" TEXT NOT NULL UNIQUE,
    "price" NUMERIC NOT NULL
);

CREATE TRIGGER "search_list"
AFTER INSERT ON "products"
FOR EACH ROw
BEGIN
    INSERT SERIALO "search"
    ("id", "title")
    VALUES(NEW.id, NEW.title);
END;

CREATE TABLE "search" (
    "id"  SERIALEGER,
    "title" TEXT
);