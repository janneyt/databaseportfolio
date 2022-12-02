// Axios
import axios from "axios";

// React
import { Link } from "react-router-dom";

// Components
import Button from "../components/Button";


// Create an axios client to use for all requests
const client = axios.create({
  baseURL: "http://localhost:60645",
});

let keys = [null];

let data = [[]];

let headers = [];

/**
 * Unfortunately, implementing CRUD required a rewrite of the Items page. The steps are as follows:
 * The old tableData variable has to be global to resolve the promises
 *
 * Created a new async function (Items cannot be async or React gets mad) that calls
 * the axios method inside itemData.js
 *
 * Use a .then method and set the response equal to a new variable
 * Assign that variable to the global tableData variable
 * Return the new variable
 *
 * For some reason, all three of these steps must be followed to resolve the Promise
 * and also store the value higher up
 *
 * Call the new async function
 *
 * Still TODO: Write a funciton that creates the currently hardcoded string of requested data
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

const updateData = async (page, updates, append, id) => {
  if (!page) {
    throw new Error("Page could not be determined.");
  }
  try {
    // Debug log
    console.log("UPDATES", updates);
    const specifics = JSON.stringify({
        table: page,
        columns: updates.current["columns"],
        values: updates.current["values"],
        filter: append});
    

    console.log("SPECIFICS for edit", specifics);
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

const deleteData = async (table, id, filter) => {
  console.log("id", id);
  console.log("filter", filter);

  // This is needed to make sure deleteData is working with the right headers
  const update_header = Array.from(headers);
  const indexer = update_header.indexOf("Edit");

  update_header.splice(indexer, 1);

  const indexer1 = update_header.indexOf("Delete");

  update_header.splice(indexer1, 1);

  // Why pass id? Because I want to make a check here that the id is valid, i.e. greater than -1.
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
  console.log("SPECIFICS", specifics);

  // When loading many tables, the headers have to change
  // Debug headers
  console.log("headers at start of Read Data", headers);
  

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
    
    console.log("DATA", data);
    console.log("HEADERS", headers);
    // Map the array of dicts to an array of arrays
    const filledData = data.map((obj) => {
      let item_array = [];
      // For every row in data
      for (let i = 0; i < headers.length - offset; i++) {
        item_array.push(obj[headers[i]]);
      }
      return item_array;
    });

    console.log("FILLED DATA", filledData);
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

    console.log(error);
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

const ReturnedData = async (action, specifics, tables) => {
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
    return await readData(specifics, tables);
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
