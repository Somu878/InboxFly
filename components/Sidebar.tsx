import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut();
  };
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className=" fixed top-0 right-0 h-screen w-1/6 text-white bg-gray-900 border-b shadow-lg z-50 p-4 overflow-y-auto flex justify-between flex-col"
    >
      <div>
        <button onClick={onClose} className="text-2xl text-gray-800">
          &times;
        </button>
        <ul className="cursor-pointer text-center">
          <li>
            <a href="#">My Account</a>
          </li>
          <li>
            <a href="#">Credits</a>
          </li>
        </ul>
      </div>
      {session && status === "authenticated" ? (
        <button
          onClick={handleLogout}
          className=" p-1 px-2 text-red-600 rounded-md border border-red-600 hover:bg-gray-900 my-7 mx-10"
        >
          Signout
        </button>
      ) : (
        <button className="p-1 px-2 rounded-md  border border-gray-100 hover:bg-gray-900 my-7 mx-10">
          <Link href="/api/auth/signin">Signin</Link>
        </button>
      )}
    </motion.div>
  );
};

export default Sidebar;
