import { useCurrentFilter, useFilteredTodos } from '@/app/providers';

export function useFilterTodos() {
  const { filter, setFilter } = useCurrentFilter();
  const { todos, allTodos } = useFilteredTodos();

  const getCounts = () => {
    return {
      all: allTodos.length,
      pending: allTodos.filter((t) => t.status === 'pending').length,
      in_progress: allTodos.filter((t) => t.status === 'in_progress').length,
      completed: allTodos.filter((t) => t.status === 'completed').length,
    };
  };

  return {
    currentFilter: filter,
    setFilter,
    filteredTodos: todos,
    counts: getCounts(),
  };
}
