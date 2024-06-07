export default function loader() {
  return (
    <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
      <div
        className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
aspect-square w-8 flex justify-center items-center"
      ></div>
    </div>
  );
}
