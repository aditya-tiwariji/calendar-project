import CalendarContainer from '@/components/CalendarContainer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-gray-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-black">
      <div className="w-full flex justify-center py-12 px-4 sm:px-8 min-h-screen items-center">
        <CalendarContainer />
      </div>
    </main>
  );
}
