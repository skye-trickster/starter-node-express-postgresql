const categoriesService = require("./categories.service.js"); // requires the service object to be used.

async function list(request, response, next) {
  try {
    const data = await categoriesService.list() // executes list function from categoriesService
    response.json({ data }) // gives response with said data. 
  } catch (error) {
    next(error) // catch errors at the end. This is one way of accomplishing error handling.
  }
}

module.exports = {
  list,
};