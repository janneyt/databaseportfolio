use cs340_janneyt;

-- Character SQLs --

-- Display Character sqls full page


SELECT idCharacter, characterName, characterDescription from Characters;

COMMIT;

-- Retrieve one specific character sql by id


SELECT idCharacter, CharacterName, characterDescription from Characters
WHERE idCharacter = '${HTML page will send over id to be retrieved}';

COMMIT;

-- Retrieve one specific character sql by name


SELECT idCharacter, characterName, characterDescription from Characters 
WHERE characterName = '${characterName passed from html page}';

COMMIT;

-- Create Character sql


INSERT INTO Characters (characterName, characterDescription, idGame) VALUES ('${This will be a name}','${This will be a description}',1);

COMMIT;

-- Update Character sql


UPDATE Characters
SET characterName = '${new name}', characterDescription = '${new description}'
WHERE idCharacter = '${id from html page}';
COMMIT;

-- Countries SQLs --

-- Delete Countries by id SQL


DELETE from Countries where idCountry = '${id passed from html page}';
COMMIT;

-- Display Countries sqls full page



SELECT idCountry, countryName, sizeInKm, population from Countries;

COMMIT;

-- Retrieve one specific Countries sql by id


SELECT idCountry, countryName, sizeInKm, population from Countries
WHERE idCountry = '${HTML page will send over id to be retrieved}';

COMMIT;

-- Retrieve one specific Countries sql by name


SELECT idCountry, countryName, sizeInKm, population from Countries 
WHERE countryName = '${countryName passed from html page}';

COMMIT;

-- Create Countries sql


INSERT INTO Countries (countryName, sizeInKm, population, idGame) VALUES ('${This will be a name}',1, 1, 1);


COMMIT;

-- Update Countries sql


UPDATE Countries
SET countryName = '${new name}', sizeInKm = '${new size}', population = '${population}'
WHERE idCountry = '${id from html page}';
COMMIT;

-- Delete Countries by id SQL


DELETE from Countries where idCountry = '${id passed from html page}';
COMMIT;

-- Games SQLs --

-- Display all games


SELECT idGame, gameName from Games;

COMMIT;

-- Retrieve one specific game by id


SELECT idGame, gameName from Games
WHERE idGame = '${HTML page will send over id to be retrieved}';

COMMIT;

-- Retrieve one specific game by name


SELECT idGame, gameName from Games 
WHERE gameName = '${game Name passed from html page}';

COMMIT;

-- Create game sql


INSERT INTO Games (gameName) VALUES ('${This will be a name}');



COMMIT;

-- Update game sql


UPDATE Games
SET gameName = '${new name}'
WHERE idGame = '${id from html page}';
COMMIT;

-- Delete Game by id SQL

DELETE from Games where idGame = '${id passed from html page}';
COMMIT;

-- Items SQLs --

-- Display all items


SELECT idItem, itemName, itemDescription from Items;

COMMIT;

-- Retrieve one specific item by id


SELECT idItem, itemName from Items
WHERE idItem = '${HTML page will send over id to be retrieved}';

COMMIT;

-- Retrieve one specific item by name


SELECT idItem, itemName from Items 
WHERE itemName = '${game Name passed from html page}';

COMMIT;

-- Create item sql


INSERT INTO Items (itemName, itemDescription, idGame) VALUES ('${This will be a name}','${This will be description}', 1);

COMMIT;

-- Update item sql


UPDATE Items
SET itemName = '${new name}'
WHERE idItem = '${id from html page}';
COMMIT;

-- Delete Item by id SQL


DELETE from Items where idItem = '${id passed from html page}';
COMMIT;

-- Players SQLs --

-- Display all players


SELECT idPlayer, playerName from Players;

COMMIT;

-- Retrieve one specific player by id

SELECT idPlayer, playerName from Players
WHERE idPlayer = '${HTML page will send over id to be retrieved}';

COMMIT;

-- Retrieve one specific player by name


SELECT idPlayer, playerName from Players 
WHERE playerName = '${game Name passed from html page}';

COMMIT;


-- Create player sql


INSERT INTO Players (playerName, idGame) VALUES ('${This will be a name}', 1);

COMMIT;

-- Update player sql


UPDATE Players
SET playerName = '${new name}'
WHERE idPlayer = '${id from html page}';
COMMIT;

-- Delete Player by id SQL


DELETE from Players where idPlayer = '${id passed from html page}';
COMMIT;

-- Characters have items SQLs --

-- Display all item-character relationships


SELECT item.itemName, chr.characterName from Characters_has_Items as chr_item
join Items as item 
on chr_item.idItem = item.idItem
join Characters as chr 
on chr.idCharacter = chr_item.idCharacter; 

COMMIT;

-- Retrieve one specific item by id


SELECT item.itemName, chr.characterName from Characters_has_Items as chr_item
join Items as item 
on chr_item.idItem = item.idItem
join Characters as chr 
on chr.idCharacter = chr_item.idCharacter
where item.idItem = '${Passed id}'; 



COMMIT;

-- Retrieve one specific character by id


SELECT item.itemName, chr.characterName from Characters_has_Items as chr_item
join Items as item 
on chr_item.idItem = item.idItem
join Characters as chr 
on chr.idCharacter = chr_item.idCharacter
where chr.idCharacter = '${Passed id}'; 

COMMIT;

-- Delete the relationship between a character and an item, 
-- but not the character and items themselves


Delete from Characters_has_Items
where idCharacter = '${Passed id}' and idItem = '${idItem passed from html}'; 

COMMIT;

-- Delete an item from a character 


Delete from Characters_has_Items
where idCharacter = '${Passed id}' and idItem = '${idItem passed from html}'; 

COMMIT;

-- Delete a character


Delete from Characters_has_Items
where idCharacter = '${Passed id}' ; 

COMMIT;

-- Delete an item


Delete from Characters_has_Items
where idItem = '${idItem passed from html}'; 

COMMIT;

-- Create character-item relationship sql


INSERT INTO Characters_has_Items (idItem, idCharacter)
select (
    select idItem from Items where idItem = '${passed variable}'
), chr.idCharacter from Characters as chr
where chr.idCharacter = '${passed variable}';

COMMIT;

-- Characters have languages SQLs --

-- Display all language-character relationships


SELECT lang.languageName, chr.characterName from Characters_has_Languages as chr_lang
join Languages as lang 
on chr_lang.idLanguage = lang.idLanguage
join Characters as chr 
on chr.idCharacter = chr_lang.idCharacter; 

COMMIT;

-- Retrieve one specific language by id


SELECT lang.languageName, chr.characterName from Characters_has_Languages as chr_lang
join Languages as lang 
on chr_lang.idLanguage = lang.idLanguage
join Characters as chr 
on chr.idCharacter = chr_lang.idCharacter
where lang.idLanguage = '${Passed id}'; 

COMMIT;

-- Retrieve one specific character by id


SELECT lang.languageName, chr.characterName from Characters_has_Languages as chr_lang
join Languages as lang 
on chr_lang.idLanguage = lang.idLanguage
join Characters as chr 
on chr.idCharacter = chr_lang.idCharacter
where chr.idCharacter = '${Passed id}'; 


COMMIT;

-- Delete the relationship between a character and an item, 
-- but not the character and items themselves


Delete from Characters_has_Languages
where idLanguage = '${Passed id}' and idLanguage = '${idLanguage passed from html}'; 

COMMIT;

-- Delete an item from a character 


Delete from Characters_has_Languages
where idCharacter = '${Passed id}' and idLanguage = '${idLanguage passed from html}'; 

COMMIT;

-- Delete a character


Delete from Characters_has_Languages
where idLanguage = '${Passed id}' ; 

COMMIT;

-- Delete an item


Delete from Characters_has_Languages
where idLanguage = '${idLanguage passed from html}'; 

COMMIT;

-- Create character-item relationship sql


INSERT INTO Characters_has_Languages (idLanguage, idCharacter)
select (
    select idLanguage from Languages where idLanguage = '${passed variable}'
), chr.idCharacter from Characters as chr
where chr.idCharacter = '${passed variable}';

COMMIT;

-- Countries have languages SQLs --

-- Display all language-Countries relationships


SELECT lang.languageName, chr.countryName from Countries_has_Languages as chr_lang
join Languages as lang 
on chr_lang.idLanguage = lang.idLanguage
join Countries as chr 
on chr.idCountry = chr_lang.idCountry; 

COMMIT;

-- Retrieve one specific language by id


SELECT lang.languageName, chr.countryName from Countries_has_Languages as chr_lang
join Languages as lang 
on chr_lang.idLanguage = lang.idLanguage
join Countries as chr 
on chr.idCountry = chr_lang.idCountry
where lang.idLanguage = '${Passed id}'; 

COMMIT;

-- Retrieve one specific Countries by id



SELECT lang.languageName, chr.countryName from Countries_has_Languages as chr_lang
join Languages as lang 
on chr_lang.idLanguage = lang.idLanguage
join Countries as chr 
on chr.idCountry = chr_lang.idCountry
where chr.idCountry = '${Passed id}'; 

COMMIT;

-- Delete the relationship between a Countries and an item, 
-- but not the Countries and items themselves


Delete from Countries_has_Languages
where idCountry = '${Passed id}' and idLanguage = '${idLanguage passed from html}'; 

COMMIT;

-- Delete an item from a Countries 


Delete from Countries_has_Languages
where idCountry = '${Passed id}' and idLanguage = '${idLanguage passed from html}'; 

COMMIT;

-- Delete a Countries


Delete from Countries_has_Languages
where idCountry = '${Passed id}' ; 

COMMIT;

-- Delete an item


Delete from Countries_has_Languages
where idLanguage = '${idLanguage passed from html}'; 

COMMIT;

-- Create Countries-item relationship sql


INSERT INTO Countries_has_Languages (idLanguage, idCountry)
select (
    select idLanguage from Languages where idLanguage = '${passed variable}'
), chr.idCountry from Countries as chr
where chr.idCountry = '${passed variable}';

select idItem, itemName from Items where itemName like `${passed from webpage}`
select idCountry, countryName from Countries where countryName like `${passed from webpage}`

COMMIT;

