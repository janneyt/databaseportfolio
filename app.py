
from flask import Flask,render_template
import os

# Configuration

app = Flask(__name__, template_folder='html')

# Routes 

@app.route('/')
def index():
    return render_template("index/index.html")

# ROUTE RELATED TO COUNTRIES HAVE LANGUAGES PAGES
@app.route('/display_countries_have_languages.html')
def display_countries_have_languages():
    return render_template('countries_have_languages/display_countries_have_languages.html')

@app.route('/add_language_to_country.html')
def add_language_to_country():
    return render_template('countries_have_languages/add_language_to_country.html')

@app.route('/delete_language_from_country.html')
def delete_language_from_country():
    return render_template('countries_have_languages/delete_language_from_country.html')

# ROUTE RELATED TO CHARACTERS HAVE LANGUAGES PAGES
@app.route('/display_characters_have_languages.html')
def display_characters_have_languages():
    return render_template('characters_have_languages/display_characters_have_languages.html')

@app.route('/add_language_to_character.html')
def add_language_to_character():
    return render_template('characters_have_languages/add_language_to_character.html')

@app.route('/delete_language_from_character.html')
def delete_language_from_character():
    return render_template('characters_have_languages/delete_language_from_character.html')

#ROUTES RELATED TO CHARACTERS HAVE ITEMS PAGES
@app.route('/display_characters_have_items.html')
def display_characters_have_items():
    return render_template('characters_have_items/display_characters_have_items.html')

@app.route('/add_item_to_character.html')
def add_item_to_character():
    return render_template('characters_have_items/add_item_to_character.html')

@app.route('/delete_item_from_character.html')
def delete_item_from_character():
    return render_template('characters_have_items/delete_item_from_character.html')

# ROUTES RELATED TO CHARACTER PAGES
@app.route('/display_characters.html')
def display_characters():
    return render_template('characters/display_characters.html')

@app.route('/add_character.html')
def add_characters():
    return render_template('characters/add_character.html')

@app.route('/delete_character.html')
def delete_characters():
    return render_template('characters/delete_character.html')

@app.route('/update_character.html')
def update_characters():
    return render_template('characters/update_character.html')

# ROUTES RELATED TO COUNTRY PAGES
@app.route('/display_countries.html')
def display_countries():
    return render_template('countries/display_countries.html')

@app.route('/add_country.html')
def add_country():
    return render_template('countries/add_country.html')

@app.route('/delete_country.html')
def delete_country():
    return render_template('countries/delete_country.html')

@app.route('/update_country.html')
def update_country():
    return render_template('countries/update_country.html')

# ROUTES RELATED TO GAME PAGES
@app.route('/display_games.html')
def display_games():
    return render_template('games/display_games.html')

@app.route('/add_game.html')
def add_game():
    return render_template('games/add_game.html')

@app.route('/delete_game.html')
def delete_game():
    return render_template('games/delete_game.html')

@app.route('/update_game.html')
def update_game():
    return render_template('games/update_game.html')

# ROUTES RELATED TO ITEM PAGES
@app.route('/display_items.html')
def display_items():
    return render_template('items/display_items.html')

@app.route('/add_item.html')
def add_item():
    return render_template('items/add_item.html')

@app.route('/delete_item.html')
def delete_item():
    return render_template('items/delete_item.html')

@app.route('/update_item.html')
def update_item():
    return render_template('items/update_item.html')

# ROUTES RELATED TO LANGUAGE RULES PAGES
@app.route('/display_language_rules.html')
def display_language_rules():
    return render_template('language_rules/display_language_rules.html')

@app.route('/add_language_rule.html')
def add_language_rule():
    return render_template('language_rules/add_language_rule.html')

@app.route('/delete_language_rule.html')
def delete_language_rule():
    return render_template('language_rules/delete_language_rule.html')

@app.route('/update_language_rule.html')
def update_language_rule():
    return render_template('language_rules/update_language_rule.html')

# ROUTES RELATED TO LANGUAGES HAVE LANGUAGE RULES PAGES
@app.route('/display_language_rules_for_language.html')
def display_language_rules_for_language():
    return render_template('languages_have_language_rules/display_language_rules_for_language.html')

@app.route('/add_language_rule_to_language.html')
def add_language_rule_for_language():
    return render_template('languages_have_language_rules/add_language_rule_to_language.html')


# ROUTES RELATED TO LANGUAGE PAGES
@app.route('/display_languages.html')
def display_languages():
    return render_template('languages/display_languages.html')

@app.route('/add_language.html')
def add_language():
    return render_template('languages/add_language.html')

@app.route('/delete_language.html')
def delete_language():
    return render_template('languages/delete_language.html')

@app.route('/update_language.html')
def update_language():
    return render_template('languages/update_language.html')

# ROUTES RELATED TO PLAYER PAGES
@app.route('/display_players.html')
def display_players():
    return render_template('players/display_players.html')

@app.route('/add_player.html')
def add_player():
    return render_template('players/add_player.html')

@app.route('/delete_player.html')
def delete_player():
    return render_template('players/delete_player.html')

@app.route('/update_player.html')
def update_player():
    return render_template('players/update_player.html')

# ROUTES RELATED TO TRANSLATION PAGES
@app.route('/display_translations.html')
def display_translations():
    return render_template('translations/display_translations.html')

@app.route('/add_translation.html')
def add_translation():
    return render_template('translations/add_translation.html')

@app.route('/delete_translation.html')
def delete_translation():
    return render_template('translations/delete_translation.html')

# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 60644))     
    app.run(port=port, debug=True)
