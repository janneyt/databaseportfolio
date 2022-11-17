const prepareFormData = (dataRef, submitData) => {
    for (const item in dataRef.current) {
        if (dataRef.current[item].value !== "undefined") {
            submitData.current["columns"].push(dataRef.current[item].name);
            submitData.current["values"].push(dataRef.current[item].value)
        }
    }

    // Temporary while we set the games update
    submitData.current["columns"].push("idGame");
    submitData.current["values"].push("1");
}

const prepareGameFormData = (dataRef, submitData) => {
    for (const item in dataRef.current) {
        if (dataRef.current[item].value !== "undefined") {
            submitData.current["columns"].push(dataRef.current[item].name);
            submitData.current["values"].push(dataRef.current[item].value)
        }
    }
}

export { prepareFormData, prepareGameFormData };