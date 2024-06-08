import Appbar from "@/components/Appbar";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 ">
      <div className=" w-[60vw]  h-screen p-2 ">
        <Appbar />
      </div>
    </main>
  );
}
