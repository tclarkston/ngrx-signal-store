import { Component, effect, inject, viewChild } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatListOption, MatSelectionList } from '@angular/material/list';

import { TodosFilter, TodosStore } from '../store/todo.store';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    NgStyle
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {


  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }

  async onAddTodo(title: string) {

    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: number, event: MouseEvent) {
    event.stopPropagation();

    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: number, completed: boolean) {

    await this.store.updateTodo(id, completed);
  }

  onFilterChanged(event: MatButtonToggleChange) {

    const filter = event.value as TodosFilter;

    this.store.updateFillter(filter);
  }
}
