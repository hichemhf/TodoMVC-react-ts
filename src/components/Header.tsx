import { useRef, KeyboardEvent } from "react";
import { ENTER_KEY } from "utils/keycodes";
import { useTodoContext } from "contexts/todosContext";

export const Header = () => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodoContext();

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // If the user presses the "Enter" key on the keyboard

    if (event.key === ENTER_KEY) {
      event.preventDefault();
      const newTodoText = newTodoRef?.current?.value.trim() ?? "";
      const isTextPresent = newTodoText.length > 0;
      if (isTextPresent) {
        addTodo(newTodoText);
        // if (newTodoRef === null || newTodoRef.current === null)
        if (!newTodoRef.current) throw new Error("newTodoRef is not assigned");
        newTodoRef.current.value = "";
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
