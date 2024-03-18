import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
