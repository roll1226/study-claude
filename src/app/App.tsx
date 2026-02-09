import { ThemeProvider, TodoProvider } from './providers';
import { TodoListPage } from '@/pages/todo-list';
import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <TodoProvider>
        <TodoListPage />
      </TodoProvider>
    </ThemeProvider>
  );
}
