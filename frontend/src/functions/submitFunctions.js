const prepareFormData = (dataRef, submitData, gameNotRequired) => {
  console.log("prepareFormData dataRef", dataRef.current);
  for (const item in dataRef.current) {
    if (dataRef.current[item].value !== "undefined") {
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
  console.log(submitData);
};

const prepareGameFormData = (dataRef, submitData) => {
  for (const item in dataRef.current) {
    if (dataRef.current[item].value !== "undefined") {
      submitData.current["columns"].push(dataRef.current[item].name);
      submitData.current["values"].push(dataRef.current[item].value);
    }
  }
};

export { prepareFormData, prepareGameFormData, prepareEditData };
