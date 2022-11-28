const userResolver = require("./UserResolver");

module.exports = {
    Query: {
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}
