SET FOREIGN_KEY_CHECKS=0;

-- -----------------------------------------------------
-- Table `Games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Games` ;

CREATE TABLE IF NOT EXISTS `Games` (
  `idGame` INT NOT NULL AUTO_INCREMENT,
  `gameName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGame`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Items` ;

CREATE TABLE IF NOT EXISTS `Items` (
  `idItem` INT NOT NULL AUTO_INCREMENT,
  `itemName` VARCHAR(120) NOT NULL,
  `itemDescription` VARCHAR(255) NOT NULL,
  `category` VARCHAR(120) NULL,
  `idGame` INT NOT NULL,
  PRIMARY KEY (`idItem`),
  INDEX `fk_Items_Games1_idx` (`idGame` ASC) VISIBLE,
  CONSTRAINT `fk_Items_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Players`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Players` ;

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


-- -----------------------------------------------------
-- Table `Countries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Countries` ;

CREATE TABLE IF NOT EXISTS `Countries` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
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


-- -----------------------------------------------------
-- Table `Characters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Characters` ;

CREATE TABLE IF NOT EXISTS `Characters` (
  `idCharacter` INT NOT NULL,
  `characterName` VARCHAR(45) NOT NULL,
  `characterDescription` VARCHAR(255) NOT NULL,
  `idPlayer` INT NULL,
  `idGame` INT NOT NULL,
  `idCountry` INT NULL,
  PRIMARY KEY (`idCharacter`),
  INDEX `fk_Characters_Players_idx` (`idPlayer` ASC) VISIBLE,
  INDEX `fk_Characters_Games1_idx` (`idGame` ASC) VISIBLE,
  INDEX `fk_Characters_Countries1_idx` (`idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_Characters_Players`
    FOREIGN KEY (`idPlayer`)
    REFERENCES `Players` (`idPlayer`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Characters_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Characters_Countries1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `Countries` (`idCountry`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Languages` ;

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


-- -----------------------------------------------------
-- Table `LanguageRules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LanguageRules` ;

CREATE TABLE IF NOT EXISTS `LanguageRules` (
  `idLanguageRule` INT NOT NULL,
  `ruleName` VARCHAR(120) NOT NULL,
  `definition` VARCHAR(255) NOT NULL,
  `variableList` VARCHAR(255) NULL,
  `LanguageRulescol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idLanguageRule`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Countries_has_Languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Countries_has_Languages` ;

CREATE TABLE IF NOT EXISTS `Countries_has_Languages` (
  `idCountry` INT NOT NULL,
  `idLanguage` INT NOT NULL,
  INDEX `fk_Countries_has_Languages_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  INDEX `fk_Countries_has_Languages_Countries1_idx` (`idCountry` ASC) VISIBLE,
  PRIMARY KEY (`idCountry`, `idLanguage`),
  CONSTRAINT `fk_Countries_has_Languages_Countries1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `Countries` (`idCountry`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Countries_has_Languages_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Characters_has_Languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Characters_has_Languages` ;

CREATE TABLE IF NOT EXISTS `Characters_has_Languages` (
  `idCharacter` INT NOT NULL,
  `idLanguage` INT NOT NULL,
  INDEX `fk_Characters_has_Languages_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  INDEX `fk_Characters_has_Languages_Characters1_idx` (`idCharacter` ASC) VISIBLE,
  PRIMARY KEY (`idCharacter`, `idLanguage`),
  CONSTRAINT `fk_Characters_has_Languages_Characters1`
    FOREIGN KEY (`idCharacter`)
    REFERENCES `Characters` (`idCharacter`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Characters_has_Languages_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Languages_has_LanguageRules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Languages_has_LanguageRules` ;

CREATE TABLE IF NOT EXISTS `Languages_has_LanguageRules` (
  `idLanguage` INT NOT NULL,
  `idLanguageRule` INT NOT NULL,
  INDEX `fk_Languages_has_LanguageRules_LanguageRules1_idx` (`idLanguageRule` ASC) VISIBLE,
  INDEX `fk_Languages_has_LanguageRules_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  PRIMARY KEY (`idLanguage`, `idLanguageRule`),
  CONSTRAINT `fk_Languages_has_LanguageRules_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Languages_has_LanguageRules_LanguageRules1`
    FOREIGN KEY (`idLanguageRule`)
    REFERENCES `LanguageRules` (`idLanguageRule`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TranslationInputs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TranslationInputs` ;

CREATE TABLE IF NOT EXISTS `TranslationInputs` (
  `idTranslationInput` INT NOT NULL,
  `inputContents` VARCHAR(255) NULL,
  PRIMARY KEY (`idTranslationInput`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TranslationOutputs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TranslationOutputs` ;

CREATE TABLE IF NOT EXISTS `TranslationOutputs` (
  `idTranslationOutput` INT NOT NULL,
  `outputContents` VARCHAR(255) NULL,
  PRIMARY KEY (`idTranslationOutput`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Languages_has_TranslationOutputs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Languages_has_TranslationOutputs` ;

CREATE TABLE IF NOT EXISTS `Languages_has_TranslationOutputs` (
  `idLanguage` INT NOT NULL,
  `idTranslationOutput` INT NOT NULL,
  `idTranslationInput` INT NOT NULL,
  PRIMARY KEY (`idLanguage`, `idTranslationOutput`, `idTranslationInput`),
  INDEX `fk_Languages_has_TranslationOutputs_TranslationOutputs1_idx` (`idTranslationOutput` ASC) VISIBLE,
  INDEX `fk_Languages_has_TranslationOutputs_Languages1_idx` (`idLanguage` ASC) VISIBLE,
  INDEX `fk_Languages_has_TranslationOutputs_TranslationInputs1_idx` (`idTranslationInput` ASC) VISIBLE,
  CONSTRAINT `fk_Languages_has_TranslationOutputs_Languages1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `Languages` (`idLanguage`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Languages_has_TranslationOutputs_TranslationOutputs1`
    FOREIGN KEY (`idTranslationOutput`)
    REFERENCES `TranslationOutputs` (`idTranslationOutput`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Languages_has_TranslationOutputs_TranslationInputs1`
    FOREIGN KEY (`idTranslationInput`)
    REFERENCES `TranslationInputs` (`idTranslationInput`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Characters_has_Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Characters_has_Items` ;

CREATE TABLE IF NOT EXISTS `Characters_has_Items` (
  `idCharacter` INT NOT NULL,
  `idItem` INT NOT NULL,
  PRIMARY KEY (`idCharacter`, `idItem`),
  INDEX `fk_Characters_has_Items_Items1_idx` (`idItem` ASC) VISIBLE,
  INDEX `fk_Characters_has_Items_Characters1_idx` (`idCharacter` ASC) VISIBLE,
  CONSTRAINT `fk_Characters_has_Items_Characters1`
    FOREIGN KEY (`idCharacter`)
    REFERENCES `Characters` (`idCharacter`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Characters_has_Items_Items1`
    FOREIGN KEY (`idItem`)
    REFERENCES `Items` (`idItem`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET FOREIGN_KEY_CHECKS=1;
-- -----------------------------------------------------
-- Data for table `Games`
-- -----------------------------------------------------

INSERT INTO `Games` (`idGame`, `gameName`) VALUES (1, 'UNASSIGNED');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (2, 'First Game');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (3, 'Second Game');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (4, 'Third Game');
INSERT INTO `Games` (`idGame`, `gameName`) VALUES (5, 'Fourth Game');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Countries`
-- -----------------------------------------------------
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (1, 'Forgotten USA', 96000000, 330000000, 1);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (2, 'USA', 96000000, 330000000, 2);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (3, 'China', 94000000, 1400000000, 2);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (4, 'England', 70000000, 70000000, 3);
INSERT INTO `Countries` (`idCountry`, `countryName`, `sizeInKm`, `population`, `idGame`) VALUES (5, 'New Zealand', 50000000, 5000000, 3);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Items`
-- -----------------------------------------------------
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`) VALUES (1, 'Forgotten sword', 'A bladed weapon lost in time', 1);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`) VALUES (2, 'sword', 'A bladed weapon', 2);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`) VALUES (3, 'knife', 'A short bladed weapon', 2);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`) VALUES (4, 'sword', 'A dull bladed weapon', 3);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`) VALUES (5, 'knife', 'A sharpened knife', 3);
INSERT INTO `Items` (`idItem`, `itemName`, `itemDescription`, `idGame`) VALUES (6, 'axe', 'The biggest axe ever', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Players`
-- -----------------------------------------------------

INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (1, 'Forgotten Player', 1);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (2, 'Donald Duck', 2);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (3, 'Mickey Mouse', 2);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (4, 'Goofy', 2);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (5, 'Minnie Mouse', 3);
INSERT INTO `Players` (`idPlayer`, `playerName`, `idGame`) VALUES (6, 'Scrooge McDuck', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Characters`
-- -----------------------------------------------------
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idGame`) VALUES (1, 'Forgotten Baggins', 'Not a party member', 1);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (2, 'Bilbo Baggins', 'Ringbearer', 2, 2, 2);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (3, 'Frodo Baggins', 'Hereditary Ringbearer', 3, 3, 4);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (4, 'Meriadoc Brandybuck', 'Buff hobbit', 2, 4, 3);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (5, 'Sam Gamgee', 'Loyal hobbit', 3, 5, 5);
INSERT INTO `Characters` (`idCharacter`, `characterName`, `characterDescription`, `idPlayer`, `idGame`, `idCountry`) VALUES (6, 'Peregrin Took', 'Buff hobbit Supreme', 2, 5, 2);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Languages`
-- -----------------------------------------------------
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (1, 'Forgotten Language', 'No one knows this language', 1);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (2, 'English', 'Language of the teamakers', 2);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (3, 'English', 'Language of the fisher people', 3);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (4, 'English', 'Language of the unified Han', 2);
INSERT INTO `Languages` (`idLanguage`, `languageName`, `languageDescription`, `idGame`) VALUES (5, 'English', 'Language of the sheep gazers', 3);


COMMIT;

-- -----------------------------------------------------
-- Data for table `TranslationOutputs`
-- -----------------------------------------------------

INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (1, 'eno');
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (2, 'tewo');
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (3, 'thrd');
INSERT INTO `TranslationOutputs` (`idTranslationOutput`, `OutputContents`) VALUES (4, 'aredx');

COMMIT;
-- -----------------------------------------------------
-- Data for table `TranslationInputs`
-- -----------------------------------------------------

INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (1, 'one');
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (2, 'two');
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (3, 'three');
INSERT INTO `TranslationInputs` (`idTranslationInput`, `inputContents`) VALUES (4, 'red');

-- -----------------------------------------------------
-- Data for table `LanguageRules`
-- -----------------------------------------------------

INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (1, 'reverse word', 'reverse sorts the text input', '');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (2, 'Random Vowel', 'Insert random English vowel into $1', '2');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (3, 'delete last 2 and add e','delete last $1 if length of word > $2 add $3 at the end', '2,3,d');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (4, 'add a at beginning and x at end', 'add $1 at the beginning of a word and adds $2 at the end', 'a, x');
INSERT INTO `LanguageRules` (`idLanguageRule`, `ruleName`, `definition`, `variableList`) VALUES (5, 'change the letter b to the letters vh', 'Select letter $1, changes to $2, except at the end of the word', 'b, vh');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Countries_has_Languages`
-- -----------------------------------------------------

INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (2, 2);
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (3, 3);
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (4, 3);
INSERT INTO `Countries_has_Languages` (`idCountry`, `idLanguage`) VALUES (5, 5);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Languages_has_TranslationOutputs`
-- -----------------------------------------------------

INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (2, 1, 1);
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (3, 2, 2);
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (4, 3, 3);
INSERT INTO `Languages_has_TranslationOutputs` (`idLanguage`, `idTranslationOutput`, `idTranslationInput`) VALUES (5, 4, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Characters_has_Languages`
-- -----------------------------------------------------

INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (2, 2);
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (3, 3);
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (4, 4);
INSERT INTO `Characters_has_Languages` (`idCharacter`, `idLanguage`) VALUES (5, 5);


COMMIT;


-- -----------------------------------------------------
-- Data for table `Languages_has_LanguageRules`
-- -----------------------------------------------------

INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (2, 1);
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (3, 2);
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (4, 3);
INSERT INTO `Languages_has_LanguageRules` (`idLanguage`, `idLanguageRule`) VALUES (5, 4);

COMMIT;

-- -----------------------------------------------------
-- Data for table `Characters_has_Items`
-- -----------------------------------------------------

INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (2,3);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (3,5);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (4,6);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (5,4);
INSERT INTO `Characters_has_Items` (`idCharacter`, `idItem`) VALUES (6,2);