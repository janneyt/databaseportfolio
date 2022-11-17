const prepareFormData = (dataRef, submitData) => {
    for (const item in dataRef.current) {
        if (dataRef.current[item].value !== "undefined") {
            submitData.current["columns"].push(dataRef.current[item].name);
            submitData.current["values"].push(dataRef.current[item].value)
        }
    }
}

export { prepareFormData };