"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-gray-900 dark:bg-gray-900 h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            440
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-100 md:text-4xl dark:text-white">
            Looks like the Session is Timed-Out
          </p>
          <p className="mb-4 text-lg font-light text-gray-400 dark:text-gray-400">
            Please sign in to continue using our services
          </p>
          <a
            href="/api/auth/signin"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Continue to Sign-in?
          </a>
        </div>
      </div>
    </section>
  );
}
