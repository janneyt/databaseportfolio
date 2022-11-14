
from flask import Flask,render_template, request, make_response
from flask_mysqldb import MySQL
from Database import Database
import os
from flask_cors import CORS


# Configuration
app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'classmysql.engr.oregonstate.edu'

app.config['MYSQL_USER'] = 'cs340_janneyt'
app.config['MYSQL_PASSWORD'] = '5008'
app.config['MYSQL_DB'] = 'cs340_janneyt'

app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

database = Database(MySQL(app))

# Routes 

@app.route('/select_data', methods=['POST'])
def select_data():
    data = request.get_json()
    print("JSON DATA:", data)
    # Ensure an append is passed to the add_select method
    try:
        append = f" {data['append']}"
    except:
        append = ''

    # Only pass to the add_select if the proper tables are present
    try:
        database.add_select(data["table"], data["columns"], append)
    except KeyError as key:
        database.debug("KeyError:", f'Key: {key} not found.')
        return str(f'KeyError: {key} not found.'), 405

    # Attempt to execute queries given to database
    try:
        database.execute()
    except Exception as error:
        database.delete_queries()  # Ensure failures don't add future queries
        return str(error), 405

    return database.get_json()

@app.route('/delete_data', methods=['POST'])
def delete_data():
    data = request.get_json()

    try:
        database.add_delete(data["table"], data["filters"])
    except KeyError as key:
        database.debug("KeyError", f'Key: {key} not found.')
        return str(f'Key: {key} not found.'), 405

    # Attempt to execute queries given to database
    try:
        database.execute()
    except Exception as error:
        database.delete_queries()  # Ensure failures don't add future queries
        return str(error), 405

    return "Delete succesful", 204

@app.route('/update_data', methods=['POST'])
def update_data():
    data = request.get_json()

    # Ensure an append is passed to the add_select method
    try:
        append = f" {data['append']}"
    except:
        append = ''

    try:
        database.add_update(data['table'], data['columns'], data['values'], data['filter'], append)
    except KeyError as key:
        database.debug("KeyError:", f'Key: {key} not found.')
        return str(f'KeyError: {key} not found.'), 405
 
    # Attempt to execute queries given to database
    try:
        database.execute()
    except Exception as error:
        database.delete_queries()  # Ensure failures don't add future queries
        return str(error), 405

    return database.get_json()

@app.route('/insert_data', methods=['POST'])
def insert_data():
    data = request.get_json()

    # Ensure an append is passed to the add_select method
    try:
        append = f" {data['append']}"
    except:
        append = ''

    # Only pass to the add_insert if the proper tables are present
    try:
        database.add_insert(data["table"], data["columns"], data["values"], append)
    except KeyError as key:
        database.debug("KeyError:", f'Key: {key} not found.')
        return str(f'KeyError: {key} not found.'), 405

    # Attempt to execute queries given to database
    try:
        database.execute()
    except Exception as error:
        database.delete_queries()  # Ensure failures don't add future queries
        return str(error), 405

    return make_response(database.get_json(), 204)



if __name__ == "__main__":
    app.run(port=60645, debug=True)
