CREATE TABLE `registrants` (
        `id` INT AUTO_INCREMENT,
        PRIMARY KEY(`id`),
        `email` VARCHAR(64) NOT NULL UNIQUE,
        `full_name` VARCHAR(64) UNIQUE,
        `username` VARCHAR(64) NOT NULL UNIQUE,
        `hash` VARCHAR(200) NOT NULL,
         `wallet` NUMERIC NOT NULL DEFAULT 1000.00,
         `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `products`
 (
    `id` INTEGER PRIMARY KEY,
    `title` VARCHAR(64) NOT NULL UNIQUE,
    `img` VARCHAR(64) NOT NULL ,
    `desc` VARCHAR(64) NOT NULL UNIQUE,
    `price` NUMERIC NOT NULL
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
    "title" VARCHAR(64)
);