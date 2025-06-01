export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br gap-6 from-blue-50 to-yellow-100">
        <div className="relative w-20 h-20 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-400"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-yellow-400"></div>
          <div className="absolute inset-4 rounded-full border-4 border-l-transparent border-pink-400"></div>
        </div>
        <span className="ml-4 text-sky-700 font-semibold text-2xl animate-pulse">در حال بارگذاری...</span>
      </div>
    );
  }