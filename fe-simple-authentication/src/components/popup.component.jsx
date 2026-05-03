import { motion, AnimatePresence } from "framer-motion";

const Popup = ({
  open,
  type = "info",
  title,
  message,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  // Warna dasar untuk light mode
  const baseColor = {
    success: "bg-green-100 text-green-700 border-green-400 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
    error: "bg-red-100 text-red-700 border-red-400 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
    info: "bg-blue-100 text-blue-700 border-blue-400 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
    warning: "bg-gray-100 text-gray-700 border-gray-400 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
  }[type];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`w-80 md:w-96 rounded-xl shadow-xl border p-6 ${baseColor} transition-colors duration-300`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              {onConfirm ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 text-sm font-medium transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-sm font-medium transition"
                  >
                    Ya
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-sm font-medium transition"
                >
                  OK
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
