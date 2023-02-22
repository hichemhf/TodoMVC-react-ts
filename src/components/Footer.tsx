import { useTodoContext } from "contexts/todosContext";
import { useMemo } from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "utils/constants";
import { TodosFilterType } from "utils/types";

export const Footer = () => {
  const { state, changeFilter } = useTodoContext();

  const [activeCount, completedCount] = useMemo(() => {
    console.log("useMemo render");
    const activeCount = state.todos.filter((todo) => !todo.isCompleted).length;
    const completedCount = state.todos.length - activeCount;
    return [activeCount, completedCount];
  }, [state.todos]);
  const hiddenClassToggle = state.todos.length === 0 ? "hidden" : "";
  const isFilterSelected = (filter: string) =>
    filter === state.filter ? "selected" : "";

  const selectFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filter: TodosFilterType
  ) => {
    event.preventDefault();
    changeFilter(filter);
  };
  return (
    <footer className={`footer ${hiddenClassToggle}`}>
      <span className="todo-count">
        <strong>{activeCount}</strong>
        <span>&nbsp;</span>
        <span>item{activeCount !== 1 ? "s" : ""} left</span>
      </span>
      <ul className="filters">
        <li>
          <a
            className={isFilterSelected(ALL_TODOS)}
            href="#/"
            onClick={(event) => selectFilter(event, ALL_TODOS)}
          >
            All
          </a>
        </li>
        <span>&nbsp;</span>
        <li>
          <a
            className={isFilterSelected(ACTIVE_TODOS)}
            href="#/"
            onClick={(event) => selectFilter(event, ACTIVE_TODOS)}
          >
            Active
          </a>
        </li>
        <span>&nbsp;</span>
        <li>
          <a
            className={isFilterSelected(COMPLETED_TODOS)}
            href="#/"
            onClick={(event) => selectFilter(event, COMPLETED_TODOS)}
          >
            Completed
          </a>
        </li>
        <span>&nbsp;</span>
      </ul>
      <button className={`clear-completed ${!completedCount ? "hidden" : ""}`}>
        Clear completed
      </button>
    </footer>
  );
};
