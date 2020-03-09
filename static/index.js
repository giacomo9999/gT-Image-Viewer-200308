console.log("Index.js here....");

axios
  .get("http://localhost:3000/data")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => console.error(error));
