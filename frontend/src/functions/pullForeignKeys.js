// This is code we no longer need for our current iteration
// But keeping it in case it is needed later (refactor issues possible)

// const pullForeignKeys = (page) => {
//     const header = page === "Players" ? playerHeaders : countryHeaders;
//     let options = [];
//     const data = header === playerHeaders ? header.slice(0, playerHeaders.length - 4) : header.slice(0, countryHeaders.length - 5);
//     const specifics = {
//       table: page === "Players" ? "Players" : "Countries",
//       columns: data,
//     };
//     console.log("specifics", specifics);
//     client
//       .post("/select_data", specifics, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("printing response", response.data);
//         let additional = {};
//         for (const item of response.data) {
//           additional = {
//             value: item.playerName ? item.playerName : (item.countryName ? item.countryName : item.countryName),
//             label: item.playerName ? item.playerName : (item.countryName ? item.countryName : item.countryName),
//           };
//           options.push(additional);
//         }
//         console.log("options in promise", options);
//       })
//       .catch((error) => console.log(error));
//     console.log("options", options);
//     return options;
//   };


// {
//     type: "select",
//     name: "idcountry",
//     label: "Country Name",
//     options: pullForeignKeys("Countries"),
// },
// {
//     type: "select",
//     name: "idplayer",
//     label: "Player Name",
//     options: pullForeignKeys("Players"),
// },