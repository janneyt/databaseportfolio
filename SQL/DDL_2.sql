-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_dempsjam
-- -----------------------------------------------------
SET @dropschema := 'cs340_dempsjam';
SET @sql := CONCAT('DROP SCHEMA IF EXISTS ', @dropschema);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
-- -----------------------------------------------------
-- Schema cs340_dempsjam
-- -----------------------------------------------------
SET @createschema := 'cs340_dempsjam';
set @createsql := CONCAT('CREATE SCHEMA IF NOT EXISTS ', @createschema);
PREPARE stmt2 from @createsql;
execute stmt2;
DEALLOCATE PREPARE stmt2;

set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;



-- -----------------------------------------------------
-- Table `Games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Games` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Games` (
  `idGame` INT NOT NULL AUTO_INCREMENT,
  `gameName` VARCHAR(45) NULL,
  PRIMARY KEY (`idGame`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Countries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Countries` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Countries` (
  `idCountry` INT NOT NULL,
  `countryName` VARCHAR(120) NOT NULL,
  `sizeInKm` INT NOT NULL,
  `population` INT NOT NULL,
  `idGame` INT NOT NULL,
  PRIMARY KEY (`idCountry`),
  CONSTRAINT `fk_Countries_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Items` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Items` (
  `idItem` INT NOT NULL AUTO_INCREMENT,
  `itemName` VARCHAR(120) NOT NULL,
  `itemDescription` VARCHAR(255) NOT NULL,
  `idGame` INT NOT NULL,
  `idCountry` INT NOT NULL,
  PRIMARY KEY (`idItem`),
  INDEX `fk_Items_Games1_idx` (`idGame` ASC) VISIBLE,
  INDEX `fk_Items_Countries1_idx` (`idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_Items_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Items_Countries1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `Countries` (`idCountry`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Players`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Players` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Players` (
  `idPlayer` INT NOT NULL AUTO_INCREMENT,
  `playerName` VARCHAR(120) NOT NULL,
  `idGame` INT NOT NULL,
  PRIMARY KEY (`idPlayer`),
  INDEX `fk_Players_Games1_idx` (`idGame` ASC) VISIBLE,
  CONSTRAINT `fk_Players_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Characters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Characters` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Characters` (
  `idCharacter` INT NOT NULL,
  `characterName` VARCHAR(45) NOT NULL,
  `characterDescription` VARCHAR(255) NOT NULL,
  `idPlayer` INT NOT NULL,
  `idGame` INT NOT NULL,
  `idCountry` INT NOT NULL,
  PRIMARY KEY (`idCharacter`),
  INDEX `fk_Characters_Players_idx` (`idPlayer` ASC) VISIBLE,
  INDEX `fk_Characters_Games1_idx` (`idGame` ASC) VISIBLE,
  INDEX `fk_Characters_Countries1_idx` (`idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_Characters_Players`
    FOREIGN KEY (`idPlayer`)
    REFERENCES `Players` (`idPlayer`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Characters_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Characters_Countries1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `Countries` (`idCountry`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Languages` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Languages` (
  `idLanguage` INT NOT NULL AUTO_INCREMENT,
  `languageName` VARCHAR(120) NOT NULL,
  `languageDescription` VARCHAR(255) NOT NULL,
  `idGame` INT NOT NULL,
  PRIMARY KEY (`idLanguage`),
  INDEX `fk_Languages_Games1_idx` (`idGame` ASC) VISIBLE,
  CONSTRAINT `fk_Languages_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `LanguageRules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LanguageRules` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `LanguageRules` (
  `idLanguageRule` INT NOT NULL,
  `ruleName` VARCHAR(120) NOT NULL,
  `definition` VARCHAR(255) NOT NULL,
  `variableList` VARCHAR(255) NULL,
  PRIMARY KEY (`idLanguageRule`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Countries_has_Languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Countries_has_Languages` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Countries_has_Languages` (
  `idCountry` INT NOT NULL,
  `idLanguage` INT NOT NULL,
  INDEX `fk_idLanguage1_idx` (`idLanguage` ASC) VISIBLE,
  INDEX `fk_idCountry1_idx` (`idCountry` ASC) VISIBLE,
  PRIMARY KEY (`idCountry`, `idLanguage`),
  CONSTRAINT `fk_Countries_has_Languages_idCountry`
    FOREIGN KEY (`idCountry`)
    REFERENCES `Countries` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Countries_has_Languages_idLanguage`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `TranslationInputs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TranslationInputs` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `TranslationInputs` (
  `idTranslationInput` INT NOT NULL,
  `inputContents` VARCHAR(255) NULL,
  PRIMARY KEY (`idTranslationInput`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Translation Outputs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TranslationOutputs` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `TranslationOutputs` (
  `idTranslationOutput` INT NOT NULL,
  `outputContents` VARCHAR(255) NULL,
  PRIMARY KEY (`idTranslationOutput`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Languages_has_LanguageRules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Languages_has_LanguageRules` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Languages_has_LanguageRules` (
  `idLanguage` INT NOT NULL,
  `idLanguageRule` INT NOT NULL,
  PRIMARY KEY (`idLanguage`, `idLanguageRule`),
  INDEX `fk_Languages_has_LanguageRules_LanguageRules1_idx` (`idLanguageRule` ASC) VISIBLE,
  INDEX `fk_Languages_has_LanguageRules_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  CONSTRAINT `fk_Languages_has_LanguageRules_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Languages_has_LanguageRules_LanguageRules1`
    FOREIGN KEY (`idLanguageRule`)
    REFERENCES `LanguageRules` (`idLanguageRule`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Languages_has_TranslationOutputs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Languages_has_TranslationOutputs` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Languages_has_TranslationOutputs` (
  `idLanguage` INT NOT NULL,
  `idTranslationOutput` INT NOT NULL,
  `idTranslationInput` INT NOT NULL,
  PRIMARY KEY (`idLanguage`, `idTranslationOutput`, `idTranslationInput`),
  INDEX `fk_Languages_has_Translation_Outputs_TranslationOutputs1_idx` (`idTranslationOutput` ASC) VISIBLE,
  INDEX `fk_Languages_has_Translation_Outputs_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  INDEX `fk_Languages_has_Translation_Outputs_TranslationInputs1_idx` (`idTranslationInput` ASC) VISIBLE,
  CONSTRAINT `fk_Languages_has_Translation_Outputs_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Languages_has_TranslationPOutputs_TranslationOutputs1`
    FOREIGN KEY (`idTranslationOutput`)
    REFERENCES `TranslationOutputs` (`idTranslationOutput`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Languages_has_Translation_Outputs_TranslationInputs1`
    FOREIGN KEY (`idTranslationInput`)
    REFERENCES `TranslationInputs` (`idTranslationInput`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Characters_has_Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Characters_has_Items` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Characters_has_Items` (
  `idCharacter` INT NOT NULL,
  `idItem` INT NOT NULL,
  PRIMARY KEY (`idCharacter`, `idItem`),
  INDEX `fk_Characters_has_Items_Items1_idx` (`idItem` ASC) VISIBLE,
  INDEX `fk_Characters_has_Items_Characters1_idx` (`idCharacter` ASC) VISIBLE,
  CONSTRAINT `fk_Characters_has_Items_Characters1`
    FOREIGN KEY (`idCharacter`)
    REFERENCES `Characters` (`idCharacter`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Characters_has_Items_Items1`
    FOREIGN KEY (`idItem`)
    REFERENCES `Items` (`idItem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Characters_has_Languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Characters_has_Languages` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Characters_has_Languages` (
  `idCharacter` INT NOT NULL,
  `idLanguage` INT NOT NULL,
  PRIMARY KEY (`idCharacter`, `idLanguage`),
  INDEX `fk_Characters_has_Languages_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  INDEX `fk_Characters_has_Languages_Characters1_idx` (`idCharacter` ASC) VISIBLE,
  CONSTRAINT `fk_Characters_has_Languages_Characters1`
    FOREIGN KEY (`idCharacter`)
    REFERENCES `Characters` (`idCharacter`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Characters_has_Languages_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Data for table `Games`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (1, 'First Game');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (2, 'Second Game');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (3, 'Third Game');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (4, 'Fourth Game');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Countries`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (1, 'USA', 96000000, 330000000, 1);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (2, 'China', 94000000, 1400000000, 1);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (3, 'England', 70000000, 70000000, 2);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (4, 'New Zealand', 50000000, 5000000, 2);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Items`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`, `idCountry`) VALUES (1, 'sword', 'A bladed weapon', 1, 1);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`, `idCountry`) VALUES (2, 'knife', 'A short bladed weapon', 1, 1);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`, `idCountry`) VALUES (3, 'sword', 'A dull bladed weapon', 2, 3);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`, `idCountry`) VALUES (4, 'knife', 'A sharpened knife', 2, 4);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`, `idCountry`) VALUES (5, 'axe', 'The biggest axe ever', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Players`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;

INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (1, 'Donald Duck', 1);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (2, 'Mickey Mouse', 1);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (3, 'Goofy', 1);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (4, 'Minnie Mouse', 2);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (5, 'Scrooge McDuck', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Characters`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (1, 'Bilbo Baggins', 'Ringbearer', 1, 1, 1);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (2, 'Frodo Baggins', 'Hereditary Ringbearer', 2, 2, 3);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (3, 'Meriadoc Brandybuck', 'Buff hobbit', 1, 3, 2);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (4, 'Sam Gamgee', 'Loyal hobbit', 2, 4, 4);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (5, 'Peregrin Took', 'Buff hobbit Supreme', 1, 5, 1);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Languages`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (1, 'English', 'Language of the teamakers', 1);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (2, 'English', 'Language of the fisher people', 2);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (3, 'English', 'Language of the unified Han', 1);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (4, 'English', 'Language of the sheep gazers', 2);


COMMIT;

-- -----------------------------------------------------
-- Data for table `TranslationOutputs`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (1, 'eno');
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (2, 'tewo');
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (3, 'thrd');
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (4, 'aredx');

COMMIT;
-- -----------------------------------------------------
-- Data for table `TranslationInputs`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (1, 'one');
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (2, 'two');
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (3, 'three');
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (4, 'red');

-- -----------------------------------------------------
-- Data for table `LanguageRules`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (1, 'reverse word', 'reverse sorts the text input', '');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (2, 'Random Vowel', 'Insert random English vowel into $1', '2');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (3, 'delete last 2 and add e','delete last $1 if length of word > $2 add $3 at the end', '2,3,d');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (4, 'add a at beginning and x at end', 'add $1 at the beginning of a word and adds $2 at the end', 'a, x');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (5, 'change the letter b to the letters vh', 'Select letter $1, changes to $2, except at the end of the word', 'b, vh');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Countries_has_Languages`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (1, 1);
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (2, 3);
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (3, 2);
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (4, 4);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Languages_has_TranslationOutputs`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (1, 1, 1);
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (2, 2, 2);
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (3, 3, 3);
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (4, 4, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Characters_has_Languages`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (1, 1);
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (2, 2);
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (3, 3);
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (4, 4);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Languages_has_LanguageRules`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (1, 1);
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (2, 2);
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (3, 3);
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (4, 4);

COMMIT;

-- -----------------------------------------------------
-- Data for table `Characters_has_Items`
-- -----------------------------------------------------
START TRANSACTION;
set @setdatabase := CONCAT('USE ', @createschema);
PREPARE stmt3 from @setdatabase;
execute stmt3;
DEALLOCATE PREPARE stmt3;
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (1,2);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (2,4);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (3,5);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (4,3);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (5,1);

COMMIT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;