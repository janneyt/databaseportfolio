from flask import jsonify

class Data():
    """A class that stores data to be manipulated."""

    def __init__(self, data={}):
        """Initializes an empty Data class."""
        self._data = data

    def convert_to_json(self):
        """Converts the current content of the data dictionary
        for the class to JSON format."""
        return jsonify(self._data)

    def set_data(self, data):
        """Sets the data to the given  data input."""
        self._data = data

    def get_data(self):
        """Returns the current data input. To get JSON
        format use convert_to_json()."""
        return self._data

    def append_data(self, key, value):
        """Appends a key, value pair to the dictionary of the data
        for the class. Does not update a key. Keys must be unique.
        Returns True if successful, otherwise returns False."""
        if key not in self._data:
            self._data[key] = value
            return True
        else:
            return False

    def update_data(self, key, value):
        """Updates a key already found in the data. Does
        not add data if no match found. Returns True
        if successful, otherwise returns False."""
        if key in self._data:
            self._data[key] = value
            return True
        else:
            return False

    def delete_data(self, key):
        """Deletes a key from the data dictionary.
        Returns True if successful, otherwise, returns False."""
        try:
            self._data.pop(key)
            return True
        except:
            return False