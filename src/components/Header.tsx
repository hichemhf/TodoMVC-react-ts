import { useRef, KeyboardEvent } from "react";
import { ENTER_KEY } from "helpers/keycodes";
import { useTodoContext } from "contexts/todosContext";

export const Header = () => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useTodoContext();

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // If the user presses the "Enter" key on the keyboard

    if (event.key === ENTER_KEY) {
      event.preventDefault();
      const newTodo = newTodoRef?.current?.value.trim() ?? "";
      const isTextPresent = newTodo.length > 0;
      if (isTextPresent) {
        alert(`You entered ${newTodo}`);
      }
    }
  }

  return (
    <header>
      <h1>todos</h1>
      <input
        className="new-todo"
        ref={newTodoRef}
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </header>
  );
};
