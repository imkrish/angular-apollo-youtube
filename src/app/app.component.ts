import { Component } from "@angular/core";
import { Todo } from "../generated/graphql";

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
}
