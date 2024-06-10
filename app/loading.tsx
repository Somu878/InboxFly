export default function loader() {
  return (
    <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
      <div
        className="m-12 inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      ></div>
    </div>
  );
}
