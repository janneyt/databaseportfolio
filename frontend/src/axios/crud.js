// Axios
import axios from "axios";

// React
import { Link } from "react-router-dom";

// Components
import Button from "../components/Button";


// Create an axios client to use for all requests
const client = axios.create({
  baseURL: "http://flip3.engr.oregonstate.edu:60645",
});

let keys = [null];

let data = [[]];

let headers = [];

/*
* Function: insertData
* Used to send an INSERT JSON request to the POST of the backend.
* Params:
*        table: The database table target for insert
*   submitData: A dictionary with all values to submit as part of request
*               In this case contains the columns and values arrays to pass.
*       append: A string to append to the SQL query in the backend.
*/
const insertData = async (table, submitData, append = "") => {
  try {
    const specifics = {
      table: table,
      columns: submitData["columns"],
      values: submitData["values"],
      append: append,
    };
    return client
      .post("/insert_data", specifics, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      });
  } catch {}
};

/*
* Function: updateData
* Used to send a request via POST to backend to update a set
* of data.
* 
* Params:
*        table: The database table target for insert
*      updates: A dictionary with all values to submit as part of request
*               In this case contains the columns and values arrays to pass.
*       append: A string to append to the SQL query in the backend.
*/
const updateData = async (table, updates, append) => {
  if (!table) {
    throw new Error("Page could not be determined.");
  }
  try {
    // Debug log
    const specifics = JSON.stringify({
        table: table,
        columns: updates.current["columns"],
        values: updates.current["values"],
        filter: append});
    

    return client
      .post("/update_data", specifics, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  } catch {}
};

/*
* Function: deleteData
* Use to send a request to backend to DELETE an entry from a table.
* 
* Params:
*        table: The database table target for insert
*           id: The id in the database of the item to be deleted
*       filter: String at end of SQL that indicates what data to select.
*/
const deleteData = async (table, id, filter) => {

  // This is needed to make sure deleteData is working with the right headers
  const update_header = Array.from(headers);

  const indexer = update_header.indexOf("Edit");
  update_header.splice(indexer, 1);

  const indexer1 = update_header.indexOf("Delete");
  update_header.splice(indexer1, 1);

  const indexer2 = update_header.indexOf("Activate");
  update_header.splice(indexer2, 1);

  // Pass id to make sure it is valid.
  try {
    if (!table || !id || id === -1) {
      throw new Error(
        "Could not delete due to missing information, try again."
      );
    }
    const specifics = {
      table: table,
      filters: filter,
    };
    return client.post("/delete_data", specifics, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const readData = async (specifics, tables, offset=2) => {

  let old_headers = headers;
  if (tables) {
    headers = tables;
  }

  try {
    await fillData(specifics).then((response) => {
      data = response;
    });



    // Weird asynchronous bug requires resetting headers so first select for intersection table succeeds.
    if (tables) {
      old_headers = headers;
      headers = tables;
    }


    // Map the array of dicts to an array of arrays
    const filledData = Array.isArray(data) ? data.map((obj) => {
      let item_array = [];
      // For every row in data
      for (let i = 0; i < headers.length - offset; i++) {
        item_array.push(obj[headers[i]]);
      }
      return item_array;
    }) : ["No Results"];

    return filledData;
    
    
  } catch (error) {
    
    const filledData = [["1", "error", "database", "not connected"]];

    
    filledData[0].push(
      <Link to="/editItem" state={{ id: 0 }}>
        <Button>Edit Item</Button>
      </Link>
    );
    filledData[0].push(
      <Link to="/deleteItem">
        <Button>DeleteItem</Button>
      </Link>
    );
    return filledData;
  }
};

// Axios being saved to state causes infinted rerenders.
const fillData = async (specifics) => {
  /**
   * The specifics JSON should be sent as per the README for the backend integraiton
   *
   * We're going to go directly to an axios post call and return it
   *
   * TODO: parameterize both the URL and the additional portion of the URL
   * so as to be available for all post requests
   *
   * TODO: write similar functions for GET and DELETE
   */

  try {
    const response = await client.post("/select_data", specifics, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = response.data;

    return response.data;
  } catch (error) {
    console.log(error);
    data = [[]];
    return error;
  }
};

const ReturnedData = async (action, specifics, tables, offset=2) => {
  /*
        Takes the action and specifics data members and creates axios posts.

        Action should be a string with CREATE, READ, UPDATE or DELETE as the possible options

        specifics should be a map with the column options formatted as per the README.
        The table and columns keys are required.
        Append is optional

        Example specifics:
        {
            "columns":"iditems",
            "table":"Items",
            "append":"WHERE idItem = 1"
        }

        This function can error. Put INSIDE A TRY/CATCH due to all the errors it can throw
    */

  try {
    // If you are not passing a string (ie if you pass an Object or JSON object)
    // This will error
    // TODO: check formatting
    specifics = JSON.parse(specifics);
  } catch {
    throw new Error(
      "Please convert to proper JSON format. Thrown by your friendly Returned Data."
    );
  }

  // Promises require me to put a bunch of placeholder/default values
  // There's probably a more elegant way to do this but I don't want to break it

  if (action.toUpperCase() === "READ") {
    return await readData(specifics, tables, offset);
  } else if (action.toUpperCase() === "UPDATE") {
    return updateData(specifics);
  } else if (action.toUpperCase() === "READINTERSECT") {
    // We have to change the headers as the intersection tables need to read from two different tables
    return await readData(specifics, tables, 0);
  }
};

export {
  ReturnedData,
  keys,
  updateData,
  insertData,
  deleteData,
  readData,
};
