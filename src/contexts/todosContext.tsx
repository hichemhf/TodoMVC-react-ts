import { ReactNode, createContext, useReducer, useContext } from "react";

type StateType = {
  todos: string[];
  filter: "all" | "active" | "completed";
};
type TodosProviderPropsType = {
  children: ReactNode;
};
//type ReducerActionType
type ReducerAction = {
  type: string;
  payload?: string;
};

type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
};

const initialState: StateType = {
  todos: ["dd"],
  filter: "all",
};

const reducer = (state: StateType, action: ReducerAction) => {
  return state;
};

export const TodosContext = createContext<
  [StateType, React.Dispatch<ReducerAction>] | []
>([]);

export const useTodoContext = () => {
  return useContext(TodosContext);
};

export const TodosProvider = ({ children }: TodosProviderPropsType) => {
  const value = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
