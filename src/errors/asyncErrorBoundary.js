/**
 * A generic error function handler for async code errors.
 * You could use try/catch statements for async functions, but this may be easier.
 * @param {function} delegate The function delegate that runs async code
 * @param {int} defaultStatus The default status code that the delegate runs on error
 */
function asyncErrorBoundary(delegate, defaultStatus) { // default status is optional, though not sure why it's blank

    return (request, response, next) => { // starts the function
        Promise.resolve()
            .then(() => delegate(request, response, next)) // runs the function with the request, response, and next keywords
            .catch((error = {}) => { // if there's an error, catch the error and give a status to it
                const { status = defaultStatus, message = error } = error;
                next({
                    status,
                    message,
                });
            });
    };
}

module.exports = asyncErrorBoundary;