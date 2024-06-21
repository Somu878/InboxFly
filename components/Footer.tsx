import Image from "next/image";
function Footer() {
  return (
    <footer className="bg-black">
      <div className=" mx-auto w-full  p-4 py-6 lg:py-4">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex   items-center">
            <Image src={"/mail.png"} width={30} height={30} alt="logo mail" />
            <span className="ml-2 mt-1 text-center text-2xl font-semibold whitespace-nowrap">
              InboxFly
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase">
                Contact us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a
                    href="https://cal.com/somu-kandula-u58ml4/15min"
                    className="hover:underline"
                  >
                    Shedule a Call?
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/Somu878"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/somu-kandula"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto  lg:my-4" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-gray-500 sm:text-center ">
            © 2024{" "}
            <a href="#" className="hover:underline">
              InboxFly™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
