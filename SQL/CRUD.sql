SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

set @setdatabase := 'cs340_janneyt';
set @database := CONCAT('USE ', @setdatabase);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

-- Character SQLs --

-- Display Character sqls full page
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idCharacter, characterName, characterDescription from Characters;

COMMIT;

-- Retrieve one specific character sql by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idCharacter, CharacterName, characterDescription from Characters
WHERE idCharacter = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific character sql by name
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idCharacter, characterName, characterDescription from Characters 
WHERE characterName = `${characterName passed from html page}`;

COMMIT;

-- Create Character sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'Characters' (characterName, characterDescription) VALUES (`${This will be a name}`,`${This will be a description}`)

COMMIT;

-- Update Character sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Characters`
SET characterName = `${new name}`, characterDescription = `${new description}`
WHERE idCharacter = `${id from html page}`
COMMIT;

-- Character SQLs --

-- Delete Character by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from Characters where idCharacter = `${id passed from html page}`
COMMIT;

-- Display country sqls full page
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idCountry, countryName, sizeInKm, population from Characters;

COMMIT;

-- Retrieve one specific character sql by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idCountry, countryName, sizeInKm, population from Characters
WHERE idCountry = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific character sql by name
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idCountry, countryName, sizeInKm, population from Characters 
WHERE countryName = `${countryName passed from html page}`;

COMMIT;

-- Create Character sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'Countries' (countryName, sizeInKm, population) VALUES (`${This will be a name}`,`${This will be a size in integers}`, `${This will be a population in integers}`)

COMMIT;

-- Update Character sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Countries`
SET countryName = `${new name}`, sizeInKm = `${new size}`, population = `${population}`
WHERE idCountry = `${id from html page}`
COMMIT;

-- Delete Character by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from country where idCountry = `${id passed from html page}`
COMMIT;

-- Games SQLs --

-- Display all games
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idGame, gameName from Games;

COMMIT;

-- Retrieve one specific game by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idGame, gameName from Games
WHERE idGame = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific game by name
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idGame, gameName from Games 
WHERE gameName = `${game Name passed from html page}`;

COMMIT;

-- Create game sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'Games' (gameName, sizeInKm, population) VALUES (`${This will be a name}`,`${This will be a size in integers}`, `${This will be a population in integers}`)

COMMIT;

-- Update game sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Games`
SET gameName = `${new name}`
WHERE idGame = `${id from html page}`
COMMIT;

-- Delete Game by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from game where idGame = `${id passed from html page}`
COMMIT;

-- Items SQLs --

-- Display all items
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idItem, itemName, itemDescription from Items;

COMMIT;

-- Retrieve one specific item by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idItem, itemName from Items
WHERE idItem = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific item by name
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idItem, itemName from Items 
WHERE itemName = `${game Name passed from html page}`;

COMMIT;

-- Create item sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'Items' (itemName, itemDescription) VALUES (`${This will be a name}`,`${This will be description}`)

COMMIT;

-- Update item sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Items`
SET itemName = `${new name}`
WHERE idItem = `${id from html page}`
COMMIT;

-- Delete Item by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from Items where idItem = `${id passed from html page}`
COMMIT;

-- Players SQLs --

-- Display all players
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idPlayers, playerName from Players;

COMMIT;

-- Retrieve one specific player by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idPlayer, playerName from Players
WHERE idItem = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific player by name
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idPlayer, playerName from Players 
WHERE playerName = `${game Name passed from html page}`;

COMMIT;

-- Create player sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'Players' (playerName, playerDescription) VALUES (`${This will be a name}`)

COMMIT;

-- Update player sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Players`
SET playerName = `${new name}`
WHERE idPlayer = `${id from html page}`
COMMIT;

-- Delete Player by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from Players where idPlayer = `${id passed from html page}`
COMMIT;

-- Translations SQLs --

-- Display all translations
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idTranslationInput, 
       inputContents, 
       (select lht.idTranslationOutput
            from Language_has_TranslationOutputs as lht
            where ti.idTranslationInput = lht.idTranslationInput),
        (select outputContents 
            from TranslationOutputs as tout
            join Language_has_TranslationOutputs as lht
            on lht.idTranslationOutpus = tout.idTranslationOutputs
            where lht.idTranslationInput = ti.idTranslationInput)
        from TranslationInputs as ti;

COMMIT;

-- Retrieve one specific translation by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idTranslationInput, 
       inputContents, 
       (select lht.idTranslationOutput
            from Language_has_TranslationOutputs as lht
            where ti.idTranslationInput = lht.idTranslationInput),
        (select outputContents 
            from TranslationOutputs as tout
            join Language_has_TranslationOutputs as lht
            on lht.idTranslationOutpus = tout.idTranslationOutputs
            where lht.idTranslationInput = ti.idTranslationInput)
        from TranslationInputs as ti;
WHERE inputContents = `${HTML page will send over id to be retrieved}`;

COMMIT;



-- Create translation sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'TranslationInputs' (inputContents) VALUES (`${This will be an English word}`)
INSERT into 'TranslationOutputs' (outputContents) VALUES ('${This will be a translated word}')

COMMIT;

-- Update player sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Players`
SET playerName = `${new name}`
WHERE idPlayer = `${id from html page}`
COMMIT;

-- Delete Player by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from Players where idPlayer = `${id passed from html page}`
COMMIT;

-- Playerss SQLs --

-- Display all players
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idPlayers, playerName from Players;

COMMIT;

-- Retrieve one specific item by id
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idPlayer, playerName from Players
WHERE idItem = `${HTML page will send over id to be retrieved}`;

COMMIT;

-- Retrieve one specific item by name
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

SELECT idPlayer, playerName from Players 
WHERE playerName = `${game Name passed from html page}`;

COMMIT;

-- Create player sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO 'Players' (playerName, playerDescription) VALUES (`${This will be a name}`)

COMMIT;

-- Update player sql
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

UPDATE `Players`
SET playerName = `${new name}`
WHERE idPlayer = `${id from html page}`
COMMIT;

-- Delete Player by id SQL
START TRANSACTION;
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

DELETE from Players where idPlayer = `${id passed from html page}`
COMMIT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;