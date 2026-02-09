import styled from 'styled-components';
import { useFilterTodos, FilterButton } from '@/features/filter-todos';
import { TODO_FILTERS } from '@/entities/todo';

const Container = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 640px) {
    flex-direction: column;
  }

  [data-theme='light'] & {
    background-color: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

export function TodoFilters() {
  const { currentFilter, setFilter, counts } = useFilterTodos();

  return (
    <Container>
      {TODO_FILTERS.map((filter) => (
        <FilterButton
          key={filter}
          filter={filter}
          isActive={currentFilter === filter}
          count={counts[filter]}
          onClick={() => setFilter(filter)}
        />
      ))}
    </Container>
  );
}
