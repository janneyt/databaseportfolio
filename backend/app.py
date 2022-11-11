
from flask import Flask,render_template, request, make_response
from flask_mysqldb import MySQL
from Database import Database
import os

# Configuration
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'classmysql.engr.oregonstate.edu'
app.config['MYSQL_USER'] = 'cs340_username'
app.config['MYSQL_PASSWORD'] = '###'
app.config['MYSQL_DB'] = 'cs340_username'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

database = Database(MySQL(app))

# Routes 

@app.route('/select_data', methods=['POST'])
def select_data():
    data = request.get_json()

    print(data)

    # Ensure an append is passed to the add_select method
    # Optional, parameter
    if 'append' not in data:
        data["append"] = ''

    # Only pass to the add_select if the proper tables are present
    if 'columns' in data and 'table' in data:
        database.add_select(data["columns"], data["table"], data["append"])

    # Test print - For Debug purposes
    print(database.get_queries())

    try:
        database.execute()
    except:
        database.delete_queries()  # Ensure failures don't add future queries
        return "The queries are wrong or database connection is missing", 405

    return database.get_json()

@app.route('/delete_data', methods=['POST'])
def delete_data():
    data = request.get_json()

    print(data)

    if 'table' in data and 'filter' in data:
        database.add_delete(data["table"], data["filters"])

    try:
        database.execute()
    except:
        database.delete_queries()
        return "The queries are wrong or database connection is missing", 405

    return make_response(204)

@app.route('/update_data', methods=['POST'])
def update_data():
    data = request.get_json()

    if 'append' not in data:
        data['append'] = ''

    if 'table' in data and 'set_pairs' in data and 'filter' in data:
        database.add_update(data['table'], data['set_pairs'], data['filter'], data['append'])

    try:
        database.execute()
    except:
        database.delete_queries()
        return "The queries are wrong or database connection is missing", 405

    return make_response(database.get_json(), 204)

@app.route('/insert_data', methods=['POST'])
def insert_data():
    data = request.get_json()

    if 'append' not in data:
        data['append'] = ''

    if 'table' in data and 'columns' in data and 'values' in data:
        database.add_insert(data['table'], data['columns'], data['values'], data['append'])

    try:
        database.execute()
    except:
        database.delete_queries()
        return "The queries are wrong or database connection is missing", 405

    return make_response(database.get_json(), 204)

# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 60645))     
    app.run(port=port, debug=True)
