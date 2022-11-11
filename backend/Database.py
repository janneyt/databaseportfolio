from Data import Data

class Database:

    def __init__(self, sql_object, queries=[], tables=[]):
        """Initialize variables, need to give a MySQL
        object with app data given as the sql_object."""
        self._mysql = sql_object
        self._queries = queries
        self._results = Data()

    def update_case(self, input):
        """Given a string as input, will ensure only
        the first letter is capitalized (to match
        case of table names in database)."""
        input.casefold()
        input.capitalize()

        return input

    def add_query(self, query):
        """Adds a manual query to the list of queries
        to execute. More complicated queries may need
        to use this method."""
        self._queries.append(query)

    def remove_query(self, index):
        """Removes the query at a given index from
        the list of queries."""
        self._queries.pop(index)

    def delete_queries(self):
        """Deletes all queries from Database object."""
        self._queries = []

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
        cursor = self._mysql.connection.cursor()
        for query in self._queries:
            cursor.execute(query)

        self._results.set_data(cursor.fetchall())


    def add_select(self, columns, table, append=''):
        """Adds a query to the list of queries with the given
        columns, table, and optional append (for things like WHERE)
        in case they are needed."""

        # Ensure proper table case
        table = self.update_case(table)

        query = 'SELECT ' + columns + ' FROM ' + table

        if append != '':
            query += ' ' + append

        self._queries.append(query)

    def add_insert(self, table, columns, values, append=''):
        """Adds an insert query to the current list of queries given
        a table, columns, and values to insert. The append parameter
        given will be added on to the end of the query."""

        # Ensure proper table case
        table = self.update_case(table)

        query = 'INSERT INTO ' + table + ' (' + columns + ') VALUES ' + '(' + values + ')'

        if append != '':
            query += ' ' + append

        self._queries.append(query)

    def add_update(self, table, set_pairs, filter='', append=''):
        """Adds an UPDATE query to the current list of queries given
        a table, a string of set_pairs to update, a filter, and an optional
        append string."""

        # Ensure proper table case
        table = self.update_case(table)

        query = 'UPDATE ' + table + ' SET ' + set_pairs + ' WHERE ' + filter

        if append != '':
            query += ' ' + append

        self._queries.append(query)

    def add_delete(self, table, filter):
        """Adds a DELETE query to the current list of queries given
        a table and a filter."""

        # Ensure proper table case
        table = self.update_case(table)

        query = 'DELETE FROM ' + table + ' WHERE ' + filter

        self._queries.append(query)

