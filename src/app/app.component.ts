import { Component } from "@angular/core";
import { Todo } from "../generated/graphql";
import { debounce } from "lodash";
import { TodoService } from "./todo/todo.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  todoList$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.getTodos();
  }

  onAddTodo(addTodoInput: HTMLInputElement) {
    addTodoInput.value = "";
  }

  onDeleteTodo(todo: Todo) {}

  onToggleCompleted(todo: Todo) {}

  onChangeTodo = debounce((todo: Todo, newValue: string) => {}, 500);
}
