const lodash = require("lodash") // [npm instlal lodash]

function mapProperties(configuration) {
    return function (data) { // map properties returns a function that requires data to process
        if (data) {
            return Object.entries(data).reduce((accumulator, [key, value]) => {
                // if key is found in config, puts it in child object.
                // similar if you removed the item, made a new object, and put the key value pair in that object
                return lodash.set(accumulator, configuration[key] || key, value)
            }, {});
        }
        return data
    }
}

module.exports = mapProperties