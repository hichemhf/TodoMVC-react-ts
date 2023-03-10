import { useTodosReducer } from "hooks/useTodosReducer";
import { ReactNode, createContext, useContext } from "react";
import { ALL_TODOS } from "helpers/constants";
import { StateType, TodoContextType } from "helpers/types";

//* types declaration

type TodosProviderPropsType = {
  children: ReactNode;
};

//* End of types declaration

const initialState: StateType = {
  todos: [],
  filter: ALL_TODOS,
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
  const {
    state,
    addTodo,
    toggleAllCompleted,
    changeFilter,
    updateTodo,
    toggleTodoCompleted,
    removeTodo,
    clearCompleted,
  } = useTodosReducer(initialState);

  return (
    <TodosContext.Provider
      value={{
        state,
        addTodo,
        toggleAllCompleted,
        changeFilter,
        updateTodo,
        toggleTodoCompleted,
        removeTodo,
        clearCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
