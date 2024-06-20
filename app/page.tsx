import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import MailBox from "@/components/MailBox";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default async function Home() {
  return (
    <>
      <main className=" flex  flex-col  justify-between ">
        <div className=" z-10 w-full min-h-screen">
          <Appbar />
          <MailBox />
        </div>
        <footer className="z-10">
          <Footer />
        </footer>
        <BackgroundBeams />
      </main>
    </>
  );
}
