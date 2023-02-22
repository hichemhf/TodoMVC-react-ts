import { useTodoContext } from "contexts/todosContext";
import { useState, MouseEvent, ChangeEvent, KeyboardEvent } from "react";
import { ENTER_KEY, ESCAPE_KEY } from "utils/keycodes";
import { TodoType } from "utils/types";

type TodoPropsType = {
  todo: TodoType;
  isEditing: Boolean;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Todo = ({ todo, isEditing, setEditingId }: TodoPropsType) => {
  const { updateTodo, toggleTodoCompleted, removeTodo } = useTodoContext();

  const [todoText, setTodoText] = useState(todo.text);
  const onToggleCompleted = () => {
    toggleTodoCompleted(todo.id);
  };
  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };
  const isTodoCompleted = todo.isCompleted ? "completed" : "";
  const editingModeClass = isEditing ? "editing" : "";
  const startEditing = () => {
    setEditingId(todo.id);
    setTodoText(todo.text);
  };
  const handleEdit = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // If the user presses the "Enter" key on the keyboard

    if (event.key === ENTER_KEY) {
      event.preventDefault();

      const isTextPresent = todoText.length > 0;
      if (isTextPresent) {
        console.log(`You entered ${todoText}`);
        updateTodo({ todoId: todo.id, newText: todoText });
        setEditingId(null);
      }
    }
    if (event.key === ESCAPE_KEY) {
      setTodoText(todo.text);
      setEditingId(null);
    }
  }

  return (
    <li className={`${isTodoCompleted} ${editingModeClass}`}>
      {/* key={todo.id} */}
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle"
          checked={todo.isCompleted}
          onChange={onToggleCompleted}
        />
        <label onDoubleClick={startEditing}>{todo.text}</label>
        <button className="destroy" onClick={handleRemoveTodo}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          id=""
          value={todoText}
          onChange={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </li>
  );
};
