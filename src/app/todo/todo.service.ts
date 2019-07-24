import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { TodoGql } from "./todo.gql";
import {
  Mutation,
  MutationCreateTodoArgs,
  MutationDeleteTodoArgs,
  MutationUpdateTodoArgs,
  NewTodoInput,
  Query,
  Todo,
  UpdatedTodoInput
} from "../../generated/graphql";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private apollo: Apollo) {}

  getTodos(): Observable<Todo[]> {
    return this.apollo
      .watchQuery<Query>({
        query: TodoGql.GetTodosQuery
      })
      .valueChanges.pipe(map(result => result.data.getTodos));
  }

  createTodo(newTodo: NewTodoInput): Observable<Todo> {
    return this.apollo
      .mutate<Mutation, MutationCreateTodoArgs>({
        mutation: TodoGql.CreateTodoMutation,
        variables: { newTodo }
      })
      .pipe(
        map(result => result.data.createTodo),
        tap((createdTodo: Todo) => {
          this.updateGetTodosQueryCache(createdTodo, "add");
        })
      );
  }

  deleteTodo(id: string): Observable<boolean> {
    return this.apollo
      .mutate<Mutation, MutationDeleteTodoArgs>({
        mutation: TodoGql.DeleteTodoMutation,
        variables: {
          id
        }
      })
      .pipe(
        map(result => result.data.deleteTodo),
        tap((success: boolean) => {
          if (success) {
            this.updateGetTodosQueryCache({ _id: id }, "delete");
          }
        })
      );
  }

  updateTodo(id: string, updatedTodo: UpdatedTodoInput): Observable<Todo> {
    return this.apollo
      .mutate<Mutation, MutationUpdateTodoArgs>({
        mutation: TodoGql.UpdateTodoMutation,
        variables: {
          id,
          updatedTodo
        }
      })
      .pipe(map(result => result.data.updateTodo));
  }

  private updateGetTodosQueryCache(
    todo: Partial<Todo>,
    action: "add" | "delete"
  ) {
    const apolloClient = this.apollo.getClient();
    const data = apolloClient.readQuery<Query>({
      query: TodoGql.GetTodosQuery
    });

    const newTodos =
      action === "add"
        ? [...data.getTodos, todo as Todo]
        : data.getTodos.filter(existingTodo => existingTodo._id !== todo._id);

    apolloClient.writeQuery<Partial<Query>>({
      query: TodoGql.GetTodosQuery,
      data: {
        getTodos: newTodos
      }
    });
  }
}
