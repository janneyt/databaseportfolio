from flask_mysqldb import MySQL

class Database:

    def __init__(self, sql_object: MySQL, queries=[], tables=[]):
        """Initialize variables, need to give a MySQL
        object with app data given as the sql_object."""
        self._mysql = sql_object
        self._debug = False

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

    def execute(self, queries):
        """Executes the list of queries given to the Database Class."""
        # Attempt connection to mysql server
        try:
            con = self._mysql.connection
            cursor = con.cursor()
        except Exception as error:
            self.debug("connection failure", str(error))
            raise error  # Pass error up to app.py

        for query, data in queries:
            print("QUERY: ", query)
            if data != {}:
                cursor.execute(query, data)
            else:
                cursor.execute(query)

        results = cursor.fetchall()
        con.commit()
        
        return results

    def create_select(self, table: str, columns: list, append=''):
        """Adds a query to the list of queries with the given
        columns, table, and optional append (for things like WHERE)
        in case they are needed."""
        
        # Ensure proper table case
        table = self.update_case(table)

        # Build string of columns from columns list
        columns_str = ", ".join(columns)

        # Append query
        query = f'SELECT {columns_str} FROM {table}{append}'

        return query, {}
        
        
    def create_insert_queries(self, table: str, columns: list, values: list, append=''):
        """Adds an insert query to the current list of queries given
        a table, columns, and values to insert. The append parameter
        given will be added on to the end of the query."""

        queries = []

        # Ensure proper table case
        table = self.update_case(table)

        insert_dict = {}
        for index in range(len(columns)):
            insert_dict[columns[index]] = values[index]

        self.debug("Prepare insert dict", str(insert_dict))

        prepare_values = []
        for column in columns:
            prepare_values.append(f"%({column})s")


        # Convert list values into strings
        columns_str = ','.join(columns)
        values_str = ','.join(prepare_values)

        # Build Insert query
        query = f'INSERT INTO {table} ({columns_str}) VALUES ({values_str}){append}'
        queries.append((query, insert_dict))

        # Build append search to get only the item
        # added back from the SQL table
        
        append = ''  # Reset append value
        for index in range(len(columns)):
            if index == 0:
                append += f' WHERE {columns[index]} = \"{values[index]}\"'
            else:
                append += f' AND {columns[index]} = \"{values[index]}\"'

        query = self.create_select(table, columns, append)
        queries.append(query)

        return queries


    def create_update_queries(self, table: str, columns: list, values: list, filter='', append=''):
        """Adds an UPDATE query to the current list of queries given
        a table, a string of set_pairs to update, a filter, and an optional
        append string."""

        queries = []

        # Ensure proper table case
        table = self.update_case(table)

        pair_list = []
        for index in range(len(columns)):
            pair_list.append('='.join((columns[index], f'\"{values[index]}\"')))

        # Convert list values into strings
        set_pairs_str = ', '.join(pair_list)

        query = f'UPDATE {table} SET {set_pairs_str}WHERE {filter}{append}'
        queries.append((query, pair_list))

        # BUILD SELECT to RETURN data UPDATED
        # -----------------------------------

        append = f' WHERE {filter}'

        # Add select to queries
        query = self.create_select(table, columns, append)
        queries.append(query)

        return queries

    def create_delete(self, table, filter):
        """Adds a DELETE query to the current list of queries given
        a table and a filter."""

        # Ensure proper table case
        table = self.update_case(table)

        query = f'DELETE FROM {table} WHERE {filter}'

        return query, {}
