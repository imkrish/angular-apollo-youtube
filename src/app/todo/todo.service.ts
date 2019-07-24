import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { TodoGql } from "./todo.gql";
import { Query, Todo } from "../../generated/graphql";
import { map } from "rxjs/operators";
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
}
