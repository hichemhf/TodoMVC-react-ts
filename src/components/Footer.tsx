import { useTodoContext } from "contexts/todosContext";
import { useMemo } from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "utils/constants";
import { TodosFilterType } from "utils/types";

export const Footer = () => {
  const { state, changeFilter, clearCompleted } = useTodoContext();

  const [activeCount, completedCount] = useMemo(() => {
    const activeCount = state.todos.filter((todo) => !todo.isCompleted).length;
    const completedCount = state.todos.length - activeCount;
    return [activeCount, completedCount];
  }, [state.todos]);
  const emptyTodosHiddenClass = state.todos.length === 0 ? "hidden" : "";
  const clearCompletedHiddenClass = !completedCount ? "hidden" : "";
  const selectedFilterClass = (filter: string) =>
    filter === state.filter ? "selected" : "";
  const handleClearCompleted = () => clearCompleted();

  const selectFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filter: TodosFilterType
  ) => {
    event.preventDefault();
    changeFilter(filter);
  };
  return (
    <footer className={`footer ${emptyTodosHiddenClass}`}>
      <span className="todo-count">
        <strong>{activeCount}</strong>
        <span>&nbsp;</span>
        <span>item{activeCount !== 1 ? "s" : ""} left</span>
      </span>
      <ul className="filters">
        <li>
          <a
            className={selectedFilterClass(ALL_TODOS)}
            href="#/"
            onClick={(event) => selectFilter(event, ALL_TODOS)}
          >
            All
          </a>
        </li>
        <span>&nbsp;</span>
        <li>
          <a
            className={selectedFilterClass(ACTIVE_TODOS)}
            href="#/"
            onClick={(event) => selectFilter(event, ACTIVE_TODOS)}
          >
            Active
          </a>
        </li>
        <span>&nbsp;</span>
        <li>
          <a
            className={selectedFilterClass(COMPLETED_TODOS)}
            href="#/"
            onClick={(event) => selectFilter(event, COMPLETED_TODOS)}
          >
            Completed
          </a>
        </li>
        <span>&nbsp;</span>
      </ul>
      <button
        className={`clear-completed ${clearCompletedHiddenClass}`}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
