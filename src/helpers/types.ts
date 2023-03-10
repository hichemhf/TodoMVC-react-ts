import { REDUCER_ACTION_TYPES } from "helpers/constants";

export type TodoType = {
    id: string;
    text: string;
    isCompleted: boolean;
  };
  
export type TodosFilterType = "all" | "active" | "completed";

export type StateType = {
    todos: TodoType[];
    filter: TodosFilterType;
  };

export type updatedTodoType = {
    todoId:string; newText:string;
  }


export type TodoContextType = {
    state: StateType;
    addTodo: (newTodoText: string) => void;
    toggleAllCompleted: (toggleAll: boolean) => void;
    changeFilter: (filter: TodosFilterType) => void;
    updateTodo: ({todoId,newText}:updatedTodoType) => void;
    toggleTodoCompleted: (todoId: string) => void;
    removeTodo: (todoId: string) => void;
    clearCompleted: () => void;
  };
  // updateTodo: ({todoId,newText}:{todoId:string, newText:string}) => void;
  // updateTodo: ({id:todoId,text:newText}:Omit<TodoType,"isCompleted">) => void;



type ReducerActionTypesValues<T> = T[keyof T];

export type ReducerActionTypesType = ReducerActionTypesValues<
  typeof REDUCER_ACTION_TYPES
>;