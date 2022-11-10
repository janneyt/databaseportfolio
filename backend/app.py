
from flask import Flask,render_template, request
from flask_mysqldb import MySQL
from Database import Database
import os

# Configuration
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'classmysql.engr.oregonstate.edu'
app.config['MYSQL_USER'] = 'cs340_username'
app.config['MYSQL_PASSWORD'] = 'XXXX'
app.config['MYSQL_DB'] = 'cs340_UserName'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

database = Database(MySQL(app))

# Routes 

@app.route('/select_data', methods=['POST'])
def select_data():
    data = request.get_json()

    if data.columns and data.table:
        if data.append:
            database.add_select(data.columns, data.table, data.append)
        else:
            database.add_select(data.columns, data.table)

    database.execute()

    return database.get_json()


# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 60645))     
    app.run(port=port, debug=True)
