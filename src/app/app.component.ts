import { Component } from "@angular/core";
import { Todo } from "../generated/graphql";
import { debounce } from "lodash";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  todoList: Todo[] = [
    {
      _id: "1",
      todo: "Take a shower",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "2",
      todo: "Poo",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  onAddTodo(addTodoInput: HTMLInputElement) {
    this.todoList = this.todoList.concat({
      _id: Date.now().toString(),
      todo: addTodoInput.value,
      completed: false,
      updatedAt: new Date(),
      createdAt: new Date()
    });
    addTodoInput.value = "";
  }

  onDeleteTodo(todo: Todo) {
    this.todoList = this.todoList.filter(
      existingTodo => existingTodo._id !== todo._id
    );
  }

  onToggleCompleted(todo: Todo) {
    const foundTodoIdx = this.todoList.findIndex(
      existingTodo => existingTodo._id === todo._id
    );

    const foundTodo = this.todoList[foundTodoIdx];

    this.todoList = [
      ...this.todoList.slice(0, foundTodoIdx),
      { ...foundTodo, completed: !foundTodo.completed },
      ...this.todoList.slice(foundTodoIdx + 1)
    ];
  }

  onChangeTodo = debounce((todo: Todo, newValue: string) => {
    const foundTodoIdx = this.todoList.findIndex(
      existingTodo => existingTodo._id === todo._id
    );

    const foundTodo = this.todoList[foundTodoIdx];

    this.todoList = [
      ...this.todoList.slice(0, foundTodoIdx),
      { ...foundTodo, todo: newValue },
      ...this.todoList.slice(foundTodoIdx + 1)
    ];
  }, 500);
}
