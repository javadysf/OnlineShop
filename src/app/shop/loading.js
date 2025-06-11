export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 gap-6">
        <div className="relative w-20 h-20 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-primary/70"></div>
          <div className="absolute inset-4 rounded-full border-4 border-l-transparent border-primary/40"></div>
        </div>
        <span className="ml-4 text-gray-900 dark:text-white font-semibold text-2xl animate-pulse">در حال بارگذاری...</span>
      </div>
    );
  }