import { Toaster } from 'sonner';
import AddTodoForm from './add-todo/components/AddTodoForm';
import QueryProvider from './components/QueryProvider';
import TodoList from './components/TodoList';
import ToggleTheme from '@/components/theme/ToggleTheme';
import { CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-8 font-[family-name:var(--font-geist-sans)]">
      <ToggleTheme />
      <main className="space-y-8 sm:pt-20">
        <QueryProvider>
          <div className='w-full flex items-center justify-center '>
            <AddTodoForm />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-16 sm:gap-y-4  gap-x-24 justify-around'>
            <div className='space-y-4'>
              <CardTitle>Active</CardTitle>
              <TodoList status='active' />
            </div>
            <div className='space-y-4'>
              <CardTitle >Completed</CardTitle>
              <TodoList status='completed' />
            </div>
          </div>
        </QueryProvider>
      </main>
      <Toaster position='top-right' richColors/>
    </div>
  );
}
