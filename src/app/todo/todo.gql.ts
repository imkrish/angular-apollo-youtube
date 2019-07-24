import gql from "graphql-tag";

export class TodoGql {
  static GetTodosQuery = gql`
    query getTodos($skip: Float, $take: Float) {
      getTodos(skip: $skip, take: $take) {
        _id
        todo
        completed
        createdAt
        updatedAt
      }
    }
  `;
}
