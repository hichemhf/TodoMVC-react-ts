import { useTodoContext } from "contexts/todosContext";
import { ChangeEvent } from "react";

export const Main = () => {
  const { state, toggleAllTodos } = useTodoContext();

  const hiddenClassToggle = state.todos.length === 0 ? "hidden" : "";
  const getVisibleTodo = () => {
    if (state.filter === "active") {
      return state.todos.filter((todo) => !todo.isCompleted);
    }
    if (state.filter === "completed") {
      return state.todos.filter((todo) => todo.isCompleted);
    }
    return state.todos;
  };
  const visibleTodo = getVisibleTodo();
  const isAllTodosSelected = state.todos.every((todo) => todo.isCompleted);
  const onToggleAllTodos = (event: ChangeEvent<HTMLInputElement>) => {
    toggleAllTodos(event.target.checked);
  };
  const onToggleTodo = () => {};

  return (
    <section className={`main ${hiddenClassToggle}`}>
      <input
        type="checkbox"
        className="toggle-all"
        id="toggle-all"
        checked={isAllTodosSelected}
        onChange={onToggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {visibleTodo.map((todo) => {
          return (
            <li key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  className="toggle"
                  id="toggle"
                  checked={todo.isCompleted}
                  onChange={onToggleTodo}
                />
                <label htmlFor="toggle">{todo.text}</label>
                <button className="destroy"></button>
              </div>
              <input type="text" className="edit" id="" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
