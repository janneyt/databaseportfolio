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

        try:
           # Attempt connection to mysql server
            con = self._mysql.connection
            cursor = con.cursor()
        except Exception as error:
            self.debug("connection failure", str(error))
            raise error  # Pass error up to app.py

        # The query_tuple contains query, data
        # Data is passed as {} where columns and values
        # are keys and values respectively
        for query_tuple in queries:
            query, data = query_tuple
            cursor.execute(query, data)

        # Get results before commit and close of connection
        results = cursor.fetchall()

        # Commit changes and close connection
        con.commit()
        return results

    def create_select(self, table: str, columns: list, append=''):
        """Adds a query to the list of queries with the given
        columns, table, and optional append (for things like WHERE)
        in case they are needed."""
        queries = []

        # Ensure proper table case
        table = self.update_case(table)

        # Build string of columns from columns list
        columns_str = ", ".join(columns)

        # Append query
        query = f'SELECT {columns_str} FROM {table}{append}'
        queries.append((query, {}))

        return queries
        
        
    def create_insert_queries(self, table: str, columns: list, values: list, append=''):
        """Adds an insert query to the current list of queries given
        a table, columns, and values to insert. The append parameter
        given will be added on to the end of the query."""
        queries = []

        # Ensure proper table case
        table = self.update_case(table)

        # Prepare dictionary of columns:values for
        # insertion
        insert_dict = {}
        for index in range(len(columns)):
            insert_dict[columns[index]] = values[index]

        # Prepares columns for VALUES () string in SQL
        prepare_values = []
        for column in columns:
            prepare_values.append(f"%({column})s")


        # Convert column, values list to strings
        # For insertion into SQL
        columns_str = ','.join(columns)
        values_str = ','.join(prepare_values)

        # Build and append to queries
        query = f'INSERT INTO {table} ({columns_str}) VALUES ({values_str}){append}'
        queries.append((query, insert_dict))

        # Build SELECT statement for return        
        append = ''
        for index in range(len(columns)):
            if index == 0:
                append += f' WHERE {columns[index]} = \"{values[index]}\"'
            else:
                append += f' AND {columns[index]} = \"{values[index]}\"'

        # Build and append to queries
        select_queries = self.create_select(table, columns, append)
        queries.append(select_queries[0])

        return queries


    def create_update_queries(self, table: str, columns: list, values: list, filter='', append=''):
        """Adds an UPDATE query to the current list of queries given
        a table, a string of set_pairs to update, a filter, and an optional
        append string."""
        queries = []

        # Ensure proper table case
        table = self.update_case(table)

        # Build pair list array join column and value data (i.e column=value)
        pair_list = []
        for index in range(len(columns)):
            pair_list.append('='.join((columns[index], f'\"{values[index]}\"')))

        # Convert list values into strings
        set_pairs_str = ', '.join(pair_list)

        # Create and append update query
        query = f'UPDATE {table} SET {set_pairs_str} WHERE {filter}{append}'
        queries.append((query, {}))


        # Build and append SELECT for return data
        append = f' WHERE {filter}'
        query = self.create_select(table, columns, append)
        queries.append(query[0])

        return queries

    def create_delete(self, table, filter):
        """Adds a DELETE query to the current list of queries given
        a table and a filter."""
        queries = []

        # Ensure proper table case
        table = self.update_case(table)

        query = f'DELETE FROM {table} WHERE {filter}'
        queries.append((query, {}))

        return queries
