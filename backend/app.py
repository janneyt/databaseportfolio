
from flask import Flask,render_template, request, make_response
from flask_mysqldb import MySQL
from Database import Database
import os
from flask_cors import CORS

from flask import jsonify


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
    
    # Ensure an append is passed to the add_select method
    try:
        append = f" {data['append']}"
    except:
        append = ''

    # Only build queries if expected dictionary keys are found
    try:
        queries = database.create_select(data["table"], data["columns"], append)
    except KeyError as key:
        database.debug("KeyError: ", f'{key} not found.')
        return str(f'KeyError: {key} not found.'), 405

    # Attempts to execute queries to database
    try:
        results = database.execute(queries)
    except Exception as error:
        database.debug("failed execute", str(error))
        return str(error), 405

    return jsonify(results)

@app.route('/delete_data', methods=['POST'])
def delete_data():
    data = request.get_json()

    try:
        queries = database.create_delete(data["table"], data["filters"])
    except KeyError as key:
        database.debug("KeyError", f'Key: {key} not found.')
        return str(f'Key: {key} not found.'), 405

    # Attempt to execute queries given to database
    try:
        results = database.execute(queries)
    except Exception as error:
        database.debug("failed execute",str(error))
        return str(error), 405

    return "Delete succesful", 204

@app.route('/update_data', methods=['POST'])
def update_data():
    data = request.get_json()
    print(data)
    # Ensure an append is passed to the add_select method
    try:
        append = f" {data['append']}"
    except:
        append = ''

    try:
        queries = database.create_update_queries(data['table'], data['columns'], data['values'], data['filter'], append)
    except KeyError as key:
        database.debug("KeyError:", f'Key: {key} not found.')
        return str(f'KeyError: {key} not found.'), 405
 
    # Attempt to execute queries given to database
    try:
        results = database.execute(queries)
    except Exception as error:
        database.debug("failed execute", str(error))
        return str(error), 405

    return jsonify(results)

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
        queries = database.create_insert_queries(data["table"], data["columns"], data["values"], append)
        print("SELECT QUERIES", queries)
    except KeyError as key:
        database.debug("KeyError:", f'Key: {key} not found.')
        return str(f'KeyError: {key} not found.'), 405

    # Attempt to execute queries given to database
    try:
        results = database.execute(queries)
    except Exception as error:
        database.debug("failed execute", str(error))
        return str(error), 405

    return jsonify(results)



if __name__ == "__main__":
    app.run(port=60645, debug=True)
