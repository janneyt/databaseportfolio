const prepareFormData = (dataRef, submitData, gameNotRequired) => {

  for (const item in dataRef.current) {
    //console.log("item in prepareForData", item)
    if(typeof dataRef.current[item] === "string"){
      submitData.current["columns"].push(item);
      submitData.current["values"].push(dataRef.current[item]);
    } else if (dataRef.current[item] === null) {
      //console.log("slotted in")
      submitData.current["columns"].push(item)
      submitData.current["values"].push(null)
    } 
    else if (dataRef.current[item].value !== "undefined") {
      submitData.current["columns"].push(dataRef.current[item].name);
      submitData.current["values"].push(dataRef.current[item].value);
    }
    
  }

  if (!gameNotRequired) {
    // Temporary while we set the games update
    submitData.current["columns"].push("idGame");
    submitData.current["values"].push("1");
  }
};

const prepareEditData = (dataRef, submitData) => {
  for (const item in dataRef.current) {
    if (dataRef.current[item].value !== "undefined") {
      submitData.current["columns"].push(dataRef.current[item].name);
      submitData.current["values"].push(dataRef.current[item].value);
    }
  }
  //console.log(submitData);
};

const prepareGameFormData = (dataRef, submitData) => {
  for (const item in dataRef.current) {
    if (dataRef.current[item].value !== "undefined") {
      submitData.current["columns"].push(dataRef.current[item].name);
      submitData.current["values"].push(dataRef.current[item].value);
    }
  }
};

const createFormContents = (names) => {
  const options = [];
  for (const name of names) {
    options.push({ value: name[0].toString(), label: name[1] });
  }
  return options;
};



export { prepareFormData, prepareGameFormData, prepareEditData, createFormContents };
