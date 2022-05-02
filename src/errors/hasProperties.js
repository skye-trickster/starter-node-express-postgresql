function hasProperties(...properties) {

    return function (request, response, next) {
        const { data = {} } = request.body
        const dataProperties = Object.keys(data)

        const missingList = properties.filter((property) => !dataProperties.includes(property)) // add missing fields to missing list

        if (missingList.length) {
            return next({
                status: 400,
                message: `Missing required properties(s): ${missingList.join(', ')}`
            })
        }
        return next()
    }
}

module.exports = hasProperties