import { ThemeProvider } from './providers/ThemeProvider';
import { TodoProvider } from './providers/TodoProvider';
import { TodoListPage } from '@/pages/todo-list/ui/TodoListPage';
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
