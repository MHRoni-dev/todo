"use client"
import AddTodoForm from './add-todo/components/AddTodoForm';
import QueryProvider from '../components/QueryProvider';
import ToggleTheme from '@/components/theme/ToggleTheme';
import TodoView from '../components/TodoView';
import { DndProvider } from '@/context/DndProvider';
import Logout from './components/Logout';
import TourProvider from '@/context/TourProvider';


export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:py-20 sm:pt-8 font-[family-name:var(--font-geist-sans)] container mx-auto">
      <TourProvider>
        <div className='flex justify-end items-center gap-4'>
          <ToggleTheme />
          <Logout />
        </div>
        <main className="space-y-8 sm:pt-20">
          <QueryProvider>
              <div className='w-full flex items-center justify-center '>
                <AddTodoForm />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-16 sm:gap-y-4  gap-x-24 justify-around'>
                <DndProvider>
                  <TodoView />
                </DndProvider>
              </div>
          </QueryProvider>
        </main>
      </TourProvider>
    </div>
  );
}
