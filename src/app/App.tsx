import { TodoProvider } from './providers';
import { TodoListPage } from '@/pages/todo-list';
import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
  return (
    <>
      <GlobalStyles />
      <TodoProvider>
        <TodoListPage />
      </TodoProvider>
    </>
  );
}
