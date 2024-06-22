import { signIn } from "next-auth/react";

function Banner() {
  const handleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <section className=" text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Transform Your Inbox
            <span className="sm:block"> with AI-Powered Clarity. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            InboxFly filters out the noise, delivering the essential information
            straight to you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              onClick={handleSignIn}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
