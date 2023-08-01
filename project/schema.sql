CREATE TABLE `registrants`(
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `email` varchar(64) NOT NULL UNIQUE,
        `full_name` varchar(64) UNIQUE NOT NULL,
        `username` varchar(64) NOT NULL UNIQUE,
        `hash` varchar(200) NOT NULL,
         `wallet` NUMERIC NOT NULL DEFAULT 1000.00,
         `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         `token` varchar(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS `products`
 (
    `id` SERIALEGER PRIMARY KEY,
    `title` varchar(64) NOT NULL UNIQUE,
    `img` varchar(64) NOT NULL ,
    `desc` varchar(64) NOT NULL UNIQUE,
    `price` NUMERIC NOT NULL
);

CREATE TRIGGER `search_list`
AFTER INSERT ON `products`
FOR EACH ROw
BEGIN
    INSERT SERIALO `search`
    (`id`, `title`)
    VALUES(NEW.id, NEW.title);
END;

CREATE TABLE `search` (
    `id`  SERIALEGER,
    `title` varchar(64)
);