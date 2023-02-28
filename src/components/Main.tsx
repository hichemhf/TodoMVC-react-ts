import { useTodoContext } from "contexts/todosContext";
import { useState, ChangeEvent } from "react";
import { Todo } from "components/Todo";

export const Main = () => {
  const { state, toggleAllCompleted } = useTodoContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const isTodosEmpty = state.todos.length === 0;
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
  const onToggleAllCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    toggleAllCompleted(event.target.checked);
  };

  return (
    <>
      {!isTodosEmpty && (
        <section className={`main`}>
          <input
            type="checkbox"
            className="toggle-all"
            id="toggle-all"
            checked={isAllTodosSelected}
            onChange={onToggleAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {visibleTodo.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  setEditingId={setEditingId}
                />
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};
