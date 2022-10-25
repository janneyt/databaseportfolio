# databaseportfolio

A poor game master runs 10 games in a week with at least 5 players, but up to 20 players in a single game. The website must record Languages, Characters, Items, and Countries, sometimes totaling over 2000 entries each, for the game master’s Players. Keeping
track of this via pen and paper is both time consuming and the records can be easily lost. This is further complicated if you want to create an otherworldly language, but trying to track it in the real world. Each character has a one-to-many relationship with languages and items, and a one-to-one relationship with countries. A player has a one-to-many relationship with a character.

This allows a game master to see at a glance the state and background of every player’s
characters. One of the major focuses will be the Language Translation module that would allow a game master to easily create a language and translate text from English to that created language. The game master will be able to create LanguageRules that are used to create Languages. The program will save any translations from English to a specific language in the Translations table. The general overview will be as such:

1. Game master assigns one or more rules to a language (where certain parts are modified
as variables). As an example, if the stored definition will shift the x letter y spots to the
right, the game master can change x and y.

2. A language is created using one or more rules. Or more specifically, a language is given
a name, a description, and a set of rules that determine how it’s created.

3. Any time a game master uses a language to translate from English to the specified
language it will be saved in the Translations table.