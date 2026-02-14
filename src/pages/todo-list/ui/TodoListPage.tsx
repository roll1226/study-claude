import styled, { keyframes } from 'styled-components';
import { TodoFilters } from '@/widgets/todo-filters/ui/TodoFilters';
import { TodoList } from '@/widgets/todo-list/ui/TodoList';
import { ThemeToggleButton } from '@/features/toggle-theme/ui/ThemeToggleButton';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }
`;

const Header = styled.header`
  position: relative;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);

  [data-theme='light'] & {
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }
`;

const ThemeToggleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  @media (max-width: 768px) {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const Title = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);

  [data-theme='light'] & {
    color: rgba(0, 0, 0, 0.65);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const FiltersContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const ListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out 0.1s backwards;
`;

export function TodoListPage() {
  return (
    <Container>
      <Header>
        <Title>📝 Todo リスト</Title>
        <Subtitle>タスクを追加・編集・管理しましょう</Subtitle>
        <ThemeToggleContainer>
          <ThemeToggleButton />
        </ThemeToggleContainer>
      </Header>

      <Content>
        <FiltersContainer>
          <TodoFilters />
        </FiltersContainer>

        <ListContainer>
          <TodoList />
        </ListContainer>
      </Content>
    </Container>
  );
}
