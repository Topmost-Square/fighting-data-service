const { gql } = require('apollo-server');

module.exports = gql`
  type FightingDataResponse {
    data: Boolean
  }
  
  type Query {
    getFightingData: Boolean
  }
  
  type Mutation {
    setFightingData(data: String): FightingDataResponse
  }
`;
