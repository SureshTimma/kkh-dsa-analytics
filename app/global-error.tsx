'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-zinc-950 text-white p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="mt-1 text-xs text-zinc-400">{error.message || 'An unexpected error occurred.'}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-4 px-3.5 py-2 bg-zinc-100 text-zinc-900 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
