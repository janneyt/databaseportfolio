from Data import Data

class Database:

    def __init__(self, sql_object, queries=[]):
        """Initialize variables, need to give a MySQL
        object with app data given as the sql_object."""
        self._mysql = sql_object
        self._queries = queries
        self._results = Data()

    def add_query(self, query):
        """Adds a manual query to the list of queries
        to execute."""
        self._queries.append(query)

    def remove_query(self, index):
        """Removes the query at a given index from
        the list of queries."""
        self._queries.pop(index)

    def get_queries(self):
        """Returns the list of current queries."""
        return self._queries

    def get_results(self):
        """Returns the results for the last list of queries
        that were run. Returns a Data Object."""
        return self._results

    def get_json(self):
        """Retuns the results in JSON format."""
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
        self._queries.append('SELECT ' + columns + ' FROM ' + table + ' ' + append)