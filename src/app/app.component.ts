import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from "./todos-list/todos-list.component";
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, JsonPipe, TodosListComponent, MatProgressSpinner]
})
export class AppComponent implements OnInit{

  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos()
    .then(() => console.log('Todos Loaded!'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
