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
  static CreateTodoMutation = gql`
    mutation createTodo($newTodo: NewTodoInput!) {
      createTodo(newTodo: $newTodo) {
        _id
        todo
        completed
        createdAt
        updatedAt
      }
    }
  `;
  static DeleteTodoMutation = gql`
    mutation deleteTodo($id: String!) {
      deleteTodo(id: $id)
    }
  `;

  static UpdateTodoMutation = gql`
    mutation updateTodo($id: String!, $updatedTodo: UpdatedTodoInput!) {
      updateTodo(id: $id, updatedTodo: $updatedTodo) {
        _id
        todo
        completed
        createdAt
        updatedAt
      }
    }
  `;
}
