const FightingDataResolver = require("./FightingDataResolver");

module.exports = {
    Query: {
        ...FightingDataResolver.Query
    },
    Mutation: {
        ...FightingDataResolver.Mutation
    }
}
