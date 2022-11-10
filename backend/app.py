
from flask import Flask,render_template, request
from flask_mysqldb import MySQL
from Database import Database
import os

# Configuration
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'classmysql.engr.oregonstate.edu'
app.config['MYSQL_USER'] = 'cs340_username'
app.config['MYSQL_PASSWORD'] = 'Password'
app.config['MYSQL_DB'] = 'cs340_username'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

database = Database(MySQL(app))

# Routes 

@app.route('/select_data', methods=['POST'])
def select_data():
    data = request.get_json()

    print(data)

    if 'append' not in data:
        data["append"] = ''

    if 'columns' in data and 'table' in data:
        database.add_select(data["columns"], data["table"], data["append"])

    print(database.get_queries())

    try:
        database.execute()
    except:
        database.delete_queries()  # Ensure failures don't add future queries
        return "Queries not added correctly.", 405

    return database.get_json()


# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 60645))     
    app.run(port=port, debug=True)
