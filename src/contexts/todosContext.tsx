import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useCallback,
} from "react";

//* types declaration
type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};
type StateType = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
};
type TodosProviderPropsType = {
  children: ReactNode;
};
//type ReducerActionType
type ReducerAction = {
  type: string;
  payload: string;
};

type TodoContextType = {
  state: StateType;
  addTodo: (newTodoText: string) => void;
  toggleAllTodos: (toggleAll: boolean) => void;
};

const BOOLEAN = {
  TRUE: "true",
  FALSE: "false",
} as const;
//* End of types declaration

const initialState: StateType = {
  todos: [],
  filter: "all",
};

const makeId = () => {
  return Math.random().toString(16);
};
const reducer = (state: StateType, action: ReducerAction) => {
  switch (action.type) {
    case "addTodo": {
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
    case "toggleAll": {
      const toggleAllTodos = state.todos.map((todo) => {
        return {
          ...todo,
          isCompleted: action.payload === BOOLEAN.TRUE,
        };
      });
      const newState = {
        ...state,
        todos: toggleAllTodos,
      };
      return newState;
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

export const TodosContext = createContext<TodoContextType | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodosContext);

  if (context === null) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodosProvider = ({ children }: TodosProviderPropsType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addTodo = useCallback((newTodoText: string) => {
    dispatch({ type: "addTodo", payload: newTodoText });
  }, []);
  const toggleAllTodos = useCallback((toggleAll: boolean) => {
    dispatch({
      type: "toggleAll",
      payload: toggleAll ? BOOLEAN.TRUE : BOOLEAN.FALSE,
    });
  }, []);

  return (
    <TodosContext.Provider value={{ state, addTodo, toggleAllTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
