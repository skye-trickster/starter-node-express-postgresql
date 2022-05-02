const categoriesService = require("./categories.service.js"); // requires the service object to be used.

function list(req, res, next) {
  console.log(categoriesService.list);
  categoriesService
    .list() // executes list function from categoriesService
    .then((data) => res.json({ data })) // gives response with said data. 
    .catch(next); // catch errors at the end
}

module.exports = {
  list,
};