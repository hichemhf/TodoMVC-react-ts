import { useReducer, useCallback, useEffect } from "react";
import {
  StateType,
  TodoContextType,
  TodosFilterType,
  ReducerActionTypesType,
  updatedTodoType,
} from "utils/types";
import { useLocalStorage } from "./useLocalStorage";
import { REDUCER_ACTION_TYPES } from "utils/constants";

//* types declaration

type ReducerAction =
  | {
      type: Exclude<
        ReducerActionTypesType,
        | typeof REDUCER_ACTION_TYPES.UPDATE_TODO
        | typeof REDUCER_ACTION_TYPES.CHANGE_FILTER
        | typeof REDUCER_ACTION_TYPES.CLEAR_COMPLETED
        | typeof REDUCER_ACTION_TYPES.TOGGLE_ALL
      >;
      payload: string;
    }
  | {
      type: typeof REDUCER_ACTION_TYPES.UPDATE_TODO;
      payload: { todoId: string; newText: string };
    }
  | {
      type: typeof REDUCER_ACTION_TYPES.CHANGE_FILTER;
      payload: TodosFilterType;
    }
  | {
      type: typeof REDUCER_ACTION_TYPES.CLEAR_COMPLETED;
    }
  | {
      type: typeof REDUCER_ACTION_TYPES.TOGGLE_ALL;
      payload: boolean;
    };

//* End of types declaration

const makeId = () => {
  return Math.random().toString(16);
};
const reducer = (state: StateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_TODO: {
      const newTodo = {
        id: makeId(),
        text: action.payload,
        isCompleted: false,
      };
      const newState = {
        ...state,
        todos: [...state.todos, newTodo],
      };
      return newState;
    }
    case REDUCER_ACTION_TYPES.TOGGLE_ALL: {
      const toggleAllCompleted = state.todos.map((todo) => {
        return {
          ...todo,
          isCompleted: action.payload,
        };
      });
      const newState = {
        ...state,
        todos: toggleAllCompleted,
      };
      return newState;
    }
    case REDUCER_ACTION_TYPES.TOGGLE_TODO: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };
    }
    case REDUCER_ACTION_TYPES.CHANGE_FILTER: {
      return { ...state, filter: action.payload };
    }
    case REDUCER_ACTION_TYPES.UPDATE_TODO: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return { ...todo, text: action.payload.newText };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };
    }
    case REDUCER_ACTION_TYPES.REMOVE_TODO: {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: updatedTodos };
    }
    case REDUCER_ACTION_TYPES.CLEAR_COMPLETED: {
      const updatedTodos = state.todos.filter((todo) => !todo.isCompleted);
      return { ...state, todos: updatedTodos };
    }
    default: {
      throw new Error("Unidentified reducer action type");
    }
  }
};

export const useTodosReducer = (initialState: StateType): TodoContextType => {
  const [storedState, setStoredState] = useLocalStorage("state", initialState);

  const [state, dispatch] = useReducer(reducer, storedState);
  const addTodo = useCallback((newTodoText: string) => {
    dispatch({ type: REDUCER_ACTION_TYPES.ADD_TODO, payload: newTodoText });
  }, []);
  const toggleAllCompleted = useCallback((toggleAll: boolean) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.TOGGLE_ALL,
      payload: toggleAll,
    });
  }, []);
  const toggleTodoCompleted = useCallback((todoId: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.TOGGLE_TODO,
      payload: todoId,
    });
  }, []);
  const changeFilter = useCallback((filter: TodosFilterType) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.CHANGE_FILTER,
      payload: filter,
    });
  }, []);
  const updateTodo = useCallback(({ todoId, newText }: updatedTodoType) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.UPDATE_TODO,
      payload: { todoId, newText },
    });
  }, []);
  const removeTodo = useCallback((todoId: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.REMOVE_TODO,
      payload: todoId,
    });
  }, []);
  const clearCompleted = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.CLEAR_COMPLETED,
    });
  }, []);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  return {
    state,
    addTodo,
    toggleAllCompleted,
    changeFilter,
    updateTodo,
    toggleTodoCompleted,
    removeTodo,
    clearCompleted,
  };
  // return [state, addTodo, toggleAllCompleted] as const ;
};
