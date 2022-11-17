from Data import Data
from flask_mysqldb import MySQL

class Database:

    def __init__(self, sql_object: MySQL, queries=[], tables=[]):
        """Initialize variables, need to give a MySQL
        object with app data given as the sql_object."""
        self._mysql = sql_object
        self._queries = queries
        self._results = Data()
        self._debug = True

    def debug(self, reason: str, msg: str):
        """Method that prints a message to the command line
        for debug purposes if self._debug is True."""
        if self._debug:
            print(f'[DEBUG - {reason.upper()}]: {msg}')

    def set_debug(self, setting: bool):
        """Changes the debug value without having to change
        a hardcoded value. The _debug attribute default is True.
        Must be True or False."""
        self._debug = setting
        
    def update_case(self, input: str) -> str:
        """Given a string as input, will ensure only
        the first letter is capitalized (to match
        case of table names in database)."""
        try:
            input.lower()
            input.capitalize()
        except Exception as error:
            self.debug("Failed Case Update", str(error))
            raise error

        return input

    def add_query(self, query: str, data = {}):
        """Adds a manual query to the list of queries
        to execute. More complicated queries may need
        to use this method. The insert data can be used
        to pass values and protect against injection attacks."""
        self._queries.append((query, data))
        self.debug("Added Query", query)

    def remove_query(self, index: int):
        """Removes the query at a given index from
        the list of queries."""
        self.debug("remove query", self._queries[index])
        self._queries.pop(index)

    def delete_queries(self):
        """Deletes all queries from Database object."""
        self._queries = []
        self.debug("delete queries", f"Current queries: {self._queries}")

    def get_queries(self):
        """Returns the list of current queries."""
        return self._queries

    def get_results(self):
        """Returns the results for the last list of queries
        that were run. Returns a Data Object."""
        return self._results

    def get_json(self):
        """Returns the results in JSON format."""
        return self._results.convert_to_json()

    def execute(self):
        """Executes the list of queries given to the Database Class."""
        # Attempt connection to mysql server
        try:
            con = self._mysql.connection
            cursor = con.cursor()
        except Exception as error:
            self.debug("connection failure", str(error))
            raise error  # Pass error up to app.py

        for query_tuple in self._queries:
            query, data = query_tuple
            print("DATA", data)
            if data != {}:
                print("USING THE DATA GIVEN")
                cursor.execute(query, data)
            else:
                cursor.execute(query)

        con.commit()

        self._results.set_data(cursor.fetchall())
        self._queries = []  # Clear executed queries
        return self.get_results()

    def add_select(self, table: str, columns: list, append=''):
        """Adds a query to the list of queries with the given
        columns, table, and optional append (for things like WHERE)
        in case they are needed."""
        
        # Ensure proper table case
        table = self.update_case(table)

        # Build string of columns from columns list
        columns_str = ", ".join(columns)

        # Append query
        query = f'SELECT {columns_str} FROM {table}{append}'
        print("query:",query)
        self.add_query(query)

    def add_insert(self, table: str, columns: list, values: list, append=''):
        """Adds an insert query to the current list of queries given
        a table, columns, and values to insert. The append parameter
        given will be added on to the end of the query."""

        # Ensure proper table case
        table = self.update_case(table)

        insert_dict = {}
        for index in range(len(columns)):
            insert_dict[columns[index]] = values[index]

        self.debug("Prepare insert dict", insert_dict)

        prepare_values = []
        for column in columns:
            prepare_values.append(f"%({column})s")


        # Convert list values into strings
        columns_str = ','.join(columns)
        values_str = ','.join(prepare_values)

        # Build Insert query
        query = f'INSERT INTO {table} ({columns_str}) VALUES ({values_str}){append}'

        self.add_query(query, insert_dict)

        # Build append search to get only the item
        # added back from the SQL table
        
        append = ''  # Reset append value
        for index in range(len(columns)):
            if index == 0:
                append += f' WHERE {columns[index]} = \"{values[index]}\"'
            else:
                append += f' AND {columns[index]} = \"{values[index]}\"'

        columns = ["*"]
        append = ''

        self.add_select(table, columns, append)



    def add_update(self, table: str, columns: list, values: list, filter='', append=''):
        """Adds an UPDATE query to the current list of queries given
        a table, a string of set_pairs to update, a filter, and an optional
        append string."""

        # Ensure proper table case
        table = self.update_case(table)

        pair_list = []
        for index in range(len(columns)):
            pair_list.append('='.join((columns[index], f'\"{values[index]}\"')))

        # Convert list values into strings
        set_pairs_str = ', '.join(pair_list)

        query = f'UPDATE {table} SET {set_pairs_str}WHERE {filter}{append}'

        self.add_query(query)

        # BUILD SELECT to RETURN data UPDATED
        # -----------------------------------

        append = f' WHERE {filter}'

        # Add select to queries
        self.add_select(table, columns, append)

    def add_delete(self, table, filter):
        """Adds a DELETE query to the current list of queries given
        a table and a filter."""

        # Ensure proper table case
        table = self.update_case(table)

        query = f'DELETE FROM {table} WHERE {filter}'

        self.add_query(query)
