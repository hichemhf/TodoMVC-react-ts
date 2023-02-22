import { useReducer, useCallback } from "react";
import {
  StateType,
  TodoContextType,
  TodosFilterType,
  ReducerActionTypesT,
} from "utils/types";

//* types declaration
export const REDUCER_ACTION_TYPES = {
  ADD_TODO: "add_todo",
  UPDATE_TODO: "update_todo",
  REMOVE_TODO: "remove_todo",
  TOGGLE_TODO: "toggle_todo",
  TOGGLE_ALL: "toggle_all",
  CHANGE_FILTER: "change_filter",
} as const;

type ReducerAction =
  | {
      type: Exclude<
        ReducerActionTypesT,
        | typeof REDUCER_ACTION_TYPES.UPDATE_TODO
        | typeof REDUCER_ACTION_TYPES.TOGGLE_ALL
      >;
      payload: string;
    }
  | {
      type: typeof REDUCER_ACTION_TYPES.UPDATE_TODO;
      payload: { todoId: string; newText: string };
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
      return { ...state, todos: updatedTodos } as StateType;
    }
    case REDUCER_ACTION_TYPES.CHANGE_FILTER: {
      return { ...state, filter: action.payload as TodosFilterType };

      // return { ...state, filter: action.payload } as StateType;
    }
    case REDUCER_ACTION_TYPES.UPDATE_TODO: {
      const payload = action.payload as { todoId: string; newText: string };
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === payload.todoId) {
          return { ...todo, text: payload.newText };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos } as StateType;
    }
    case REDUCER_ACTION_TYPES.REMOVE_TODO: {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: updatedTodos } as StateType;
    }
    default: {
      throw new Error("Unidentified reducer action type");
    }
  }
};

export const useTodosReducer = (initialState: StateType): TodoContextType => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  const updateTodo = useCallback(
    ({ todoId, newText }: { todoId: string; newText: string }) => {
      dispatch({
        type: REDUCER_ACTION_TYPES.UPDATE_TODO,
        payload: { todoId, newText },
      });
    },
    []
  );
  const removeTodo = useCallback((todoId: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.REMOVE_TODO,
      payload: todoId,
    });
  }, []);

  return {
    state,
    addTodo,
    toggleAllCompleted,
    changeFilter,
    updateTodo,
    toggleTodoCompleted,
    removeTodo,
  };
  // return [state, addTodo, toggleAllCompleted] as const ;
};
