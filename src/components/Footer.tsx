import { useTodoContext } from "contexts/todosContext";
import { useMemo } from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "helpers/constants";
import { TodosFilterType } from "helpers/types";

export const Footer = () => {
  const { state, changeFilter, clearCompleted } = useTodoContext();

  const [activeCount, completedCount] = useMemo(() => {
    const activeCount = state.todos.filter((todo) => !todo.isCompleted).length;
    const completedCount = state.todos.length - activeCount;
    return [activeCount, completedCount];
  }, [state.todos]);

  const isTodosEmpty = state.todos.length === 0;

  const showClearCompleted = completedCount !== 0;

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
    <>
      {!isTodosEmpty && (
        <footer className={`footer`}>
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
          {showClearCompleted && (
            <button
              className={`clear-completed`}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
