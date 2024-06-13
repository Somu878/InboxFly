import Appbar from "@/components/Appbar";
import MailBox from "@/components/MailBox";
export default async function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-between p-14 bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute  left-1 right-0 top-[-20%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      <div className="relative w-full h-screen ">
        <h1 className="text-center font-sans text-3xl font-bold">InboxFly</h1>
        <Appbar />
        <div>
          <MailBox />
        </div>
      </div>
    </main>
  );
}
