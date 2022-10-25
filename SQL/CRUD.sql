SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DECLARE @database as varchar(45)='cs340_janneyt';


-- Display Character sqls full page
START TRANSACTION;
USE @database;

SELECT idCharacter, characterName, characterDescription from Characters;

COMMIT;

-- Retrieve one specific character sql by id
START TRANSACTION;
USE @database;

SELECT idCharacter, CharacterName, characterDescription from Characters
WHERE idCharacter = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific character sql by name
START TRANSACTION;
USE @database;

SELECT idCharacter, characterName, characterDescription from Characters 
WHERE characterName = `${characterName passed from html page}`;

COMMIT;

-- Create Character sql
START TRANSACTION;
use @database;

INSERT INTO 'Characters' (characterName, characterDescription) VALUES (`${This will be a name}`,`${This will be a description}`)

COMMIT;

-- Update Character sql
START TRANSACTION;
use @database;

UPDATE `Characters`
SET characterName = `${new name}`, characterDescription = `${new description}`
WHERE idCharacter = `${id from html page}`
COMMIT;

-- Delete Character by id SQL
START TRANSACTION;
USE @database;

DELETE from Characters where idCharacter = `${id passed from html page}`
COMMIT;

-- Display country sqls full page
START TRANSACTION;
USE @database;

SELECT idCountry, countryName, sizeInKm, population from Characters;

COMMIT;

-- Retrieve one specific character sql by id
START TRANSACTION;
USE @database;

SELECT idCountry, countryName, sizeInKm, population from Characters
WHERE idCountry = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific character sql by name
START TRANSACTION;
USE @database;

SELECT idCountry, countryName, sizeInKm, population from Characters 
WHERE countryName = `${countryName passed from html page}`;

COMMIT;

-- Create Character sql
START TRANSACTION;
use @database;

INSERT INTO 'Countries' (countryName, sizeInKm, population) VALUES (`${This will be a name}`,`${This will be a size in integers}`, `${This will be a population in integers}`)

COMMIT;

-- Update Character sql
START TRANSACTION;
use @database;

UPDATE `Countries`
SET countryName = `${new name}`, sizeInKm = `${new size}`, population = `${population}`
WHERE idCountry = `${id from html page}`
COMMIT;

-- Delete Character by id SQL
START TRANSACTION;
USE @database;

DELETE from country where idCountry = `${id passed from html page}`
COMMIT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;