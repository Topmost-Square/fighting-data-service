import { gql } from "apollo-server-core";
const Schema = gql`
  type Person {
      id: ID!
      name: String
  }
  
  type Query {
      getPerson(id: Int): Person
  }
`;

export default Schema;
