import Appbar from "@/components/Appbar";
import MailBox from "@/components/MailBox";
// import { getServerSession } from "next-auth";
// import fetchMessages from "@/lib/actions/gmailApi.action";
// import { authOptions } from "@/lib/auth";
export default async function Home() {
  // const session = await getServerSession(authOptions);
  // const sessionString = JSON.stringify(session, null, 2);
  // const messages = fetchMessages(session.acess_token);
  return (
    <main className="flex h-screen flex-col items-center justify-between p-14 ">
      <div className="w-full h-screen p-2 md:max-w-[60vw]">
        <Appbar />
        <div>
          <MailBox />
        </div>
      </div>
    </main>
  );
}
