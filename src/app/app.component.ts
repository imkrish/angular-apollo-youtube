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
    this.todoService.createTodo({ todo: addTodoInput.value }).subscribe(() => {
      addTodoInput.value = "";
    });
  }

  onDeleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo._id).subscribe(console.log);
  }

  onToggleCompleted(todo: Todo) {
    this.todoService
      .updateTodo(todo._id, { completed: !todo.completed })
      .subscribe();
  }

  onChangeTodo = debounce((todo: Todo, newValue: string) => {
    this.todoService.updateTodo(todo._id, { todo: newValue }).subscribe();
  }, 500);
}
