import Form from "./Forms/Form";
// Functions
import {
  prepareFormData,
  createFormContents,
} from "../functions/submitFunctions.js";

// React
import { useEffect, useState, useRef } from "react";

import { DataNext } from "../axios/DataNext.js";
import ShowIfLoaded from "./ShowIfLoaded";
import TableView from "./TableView/TableView";

const SearchBar = (props) => {
  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });
  const [searchForm, setSearchForm] = useState(props.searchFormContents);
  const [searchItems, setSearchItems] = useState([]);

  // Different from normal because we want to activate isLoading later
  const [isLoading, setIsLoading] = useState(false);

  const prepareSearchData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    prepareFormData(dataRef, submitData, true);

    // This creates a fairly exhaustive list of upper and lower cases letters with the search parameter entered in the text box used as the first characters in the search term
    const append_table1 = `WHERE ${props.nameValue1} LIKE '${submitData.current.values}%%' or ${props.nameValue1} LIKE '${submitData.current.values.toString().toUpperCase()}%%' or ${props.nameValue1} LIKE '${submitData.current.values.toString().toLowerCase()}%%' or ${props.nameValue1} LIKE '${submitData.current.values.toString().charAt(0).toUpperCase().concat(submitData.current.values.toString().slice(1))}%%'`;
    const append_table2 = `WHERE ${props.nameValue2} LIKE '${submitData.current.values}%%' or ${props.nameValue2} LIKE '${submitData.current.values.toString().toUpperCase()}%%' or ${props.nameValue2} LIKE '${submitData.current.values.toString().toLowerCase()}%%' or ${props.nameValue2} LIKE '${submitData.current.values.toString().charAt(0).toUpperCase().concat(submitData.current.values.toString().slice(1))}%%'`;
    Promise.allSettled([
      DataNext(`${props.joinedPage1}`, append_table1),
      DataNext(`${props.joinedPage2}`, append_table2),
    ])
      .then((values) => {
        const first_return = values[0].value;
        const second_return = values[1].value;
        if (first_return.length < 1 && second_return.length < 1) {
          const results = [[]];
          for (const data of props.headers) {
            results[0].push("No results found");
          }
          setSearchItems(results);
        }
        // There were two tables. One will be empty. Use this to select a table to show all items belonging to that character
        else if (first_return.length === 0) {

          const ids = [];
          for (const item of second_return) {
            ids.push(item[0].toString());
          }
          Promise.allSettled([
            // DataNext for intersection tables automatically assigns the two joined sets of items based
            // on our append value

            DataNext(
              `${props.page}`,
              `WHERE id${props.joinedValue2} in (${ids})`
            ),
          ]).then((final_values) => {
            setSearchItems(final_values[0].value);
            setIsLoading(false);
          });
        } else if (second_return.length === 0) {
          const ids = [];
          for (const item of first_return) {
            ids.push(item[0].toString());
          }
          Promise.allSettled([
            DataNext(
              `${props.page}`,
              `WHERE id${props.joinedValue1} = ${first_return[0][0]}`
            ),
          ]).then((values) => {
            setSearchItems(values[0].value);
            setIsLoading(false);
          });
        }
      })
      .catch((error) => console.log(error));
    submitData.current = { columns: [], values: [] };
    
  };
  return (
    <>
      <div className="topnav">
        <br />
        <Form
          submitText="Search"
          inputState={searchForm}
          onSubmit={prepareSearchData}
          refDict={dataRef}
        ></Form>
        Results found:
        <ShowIfLoaded isLoading={isLoading}>
          <h2>Search Table</h2>
          <p>Results only show when given a search query.</p>
          <TableView headers={props.headers} listData={searchItems} />
        </ShowIfLoaded>
      </div>
    </>
  );
};

export default SearchBar;
