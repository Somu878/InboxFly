import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import MailBox from "@/components/MailBox";
export default async function Home() {
  return (
    <main className="relative flex  flex-col  justify-between  bg-black">
      <div className="relative w-full min-h-screen">
        <Appbar />
        <MailBox />
        <Footer />
      </div>
    </main>
  );
}
