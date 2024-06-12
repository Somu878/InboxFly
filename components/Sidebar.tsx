import { motion } from "framer-motion";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  emailContent: {
    id: string;
    from: string;
    snippet: string;
    subject: string;
    body: string;
    mimType: string;
  } | null;
}
const Sidebar = ({ isOpen, onClose, emailContent }: SidebarProps) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-3/6 text-white bg-gray-900 border-l shadow-lg z-50 p-4 overflow-y-auto"
    >
      <button onClick={onClose} className="text-2xl text-gray-800">
        &times;
      </button>
      {emailContent && (
        <div className="overflow-hidden">
          <p>{emailContent.from}</p>
          <h2 className="text-2xl font-bold mb-4">{emailContent.subject}</h2>
          <p>{emailContent.snippet}</p>
          <div>{emailContent.body}</div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
