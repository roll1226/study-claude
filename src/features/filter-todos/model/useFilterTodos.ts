import { useCurrentFilter, useFilteredTodos } from '@/app/providers';
import { TODO_STATUSES } from '@/entities/todo';

export function useFilterTodos() {
  const { filter, setFilter } = useCurrentFilter();
  const { todos, allTodos } = useFilteredTodos();

  const getCounts = () => {
    return {
      all: allTodos.length,
      pending: allTodos.filter((t) => t.status === TODO_STATUSES.pending).length,
      in_progress: allTodos.filter((t) => t.status === TODO_STATUSES.in_progress).length,
      completed: allTodos.filter((t) => t.status === TODO_STATUSES.completed).length,
    };
  };

  return {
    currentFilter: filter,
    setFilter,
    filteredTodos: todos,
    counts: getCounts(),
  };
}
