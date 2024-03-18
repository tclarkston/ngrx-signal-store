import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../model/todo.model";
import { Action } from "rxjs/internal/scheduler/Action";
import { inject } from "@angular/core";
import { TodosService } from "../services/todos.service";

export type TodosFilter =
    "all" | "pending" | "completed";


type TodosState = {
	todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: "all"
}

export const TodosStore = signalStore(
  { providedIn: 'root' },
    withState(initialState),
    withMethods(
      (store, todoService = inject(TodosService)) =>({

        async loadAll() {

          patchState(store, { loading: true });
          const todos = await todoService.getTodos();
          patchState(store, { todos, loading: false });

        }
      })
    )
);
