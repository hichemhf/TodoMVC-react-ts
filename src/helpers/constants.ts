export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

export const REDUCER_ACTION_TYPES = {
    ADD_TODO: "add_todo",
    UPDATE_TODO: "update_todo",
    REMOVE_TODO: "remove_todo",
    TOGGLE_TODO: "toggle_todo",
    TOGGLE_ALL: "toggle_all",
    CHANGE_FILTER: "change_filter",
    CLEAR_COMPLETED: "clear_completed",
  } as const;
  