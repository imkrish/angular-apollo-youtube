import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  todoList: any[] = [{ todo: "Take a shower" }, { todo: "Poo" }];
}
