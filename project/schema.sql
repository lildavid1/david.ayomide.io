CREATE TABLE IF NOT EXISTS 'registrants'
(
        'id' INTEGER PRIMARY KEY,
        'email' TEXT NOT NULL UNIQUE ,
        'full_name' TEXT UNIQUE s,
        'username' TEXT NOT NULL UNIQUE,
        'hash' TEXT NOT NULL,
         'wallet' NUMERIC NOT NULL DEFAULT 1000.00,
         'timestamp' DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS 'products'
 (
    'id' INTEGER PRIMARY KEY,
    'title' TEXT NOT NULL UNIQUE,
    'img' TEXT NOT NULL ,
    'desc' TEXT NOT NULL UNIQUE,
    'price' NUMERIC NOT NULL
);

CREATE TRIGGER "search_list"
AFTER INSERT ON "products"
FOR EACH ROW
BEGIN
    INSERT INTO "search"
    ("id", "title")
    VALUES(NEW.id, NEW.title);
END;

CREATE TABLE "search" (
    "id"  INTEGER,
    "title" TEXT
);