Example POST request:

    {"columns": "string_of_columns", "table":"table_name_string"}
    ---

    Table name must have a capital letter but all other words can be case agnostic
    {"columns":[idItem, itemName],"table":"Items"}
    ---

    To add a where clause, use the append field
    {"columns":[idItem, itemname],"table":"Items","append":"where iditem = 1"}
    ---

    To update data:
    {"set_pairs":["itemname=sword", itemdescription="Yet another sword"], "table":"Items", "filter":"iditem = 1"}

    Can send an append key:value pair to add on after the filter clause.
    ---
