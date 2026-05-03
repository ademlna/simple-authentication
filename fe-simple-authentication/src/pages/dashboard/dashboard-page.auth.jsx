import { useState, useEffect, useRef } from "react";
import { getProfile, logout } from "@/services/auth.service";
import { LogOut, User, Sun, Moon } from "lucide-react";
import Loading from "@/components/loading.component";
import logo from "@/components/logo.component";
import Popup from "@/components/popup.component";
import DarkModeToggle from "@/components/darkmode.component";

const Dashboard = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [theme, setTheme] = useState("false"); 
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
  });
  const menuRef = useRef(null);

  useEffect(() => {
    // Cek localStorage dulu
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "true");
    } else {
      // fallback: cek preferensi browser
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.response.data);
      } catch (err) {
        setError(err.message || "Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // klik di luar menu => tutup dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const confirmLogout = () => {
    setPopup({
      open: true,
      type: "warning",
      title: "Konfirmasi Logout",
      message: "Apakah kamu yakin ingin keluar dari aplikasi?",
      onConfirm: handleLogout,
    });
  };

  const handleLogout = async () => {
    setPopup({ ...popup, open: false });
    try {
      const res = await logout();
      if (res.response.success) {
        setPopup({
          open: true,
          type: "success",
          title: "Logout Berhasil",
          message: res.response.message,
          onConfirm: null, // tidak ada tombol konfirmasi
        });

        // otomatis logout setelah 3 detik
        setTimeout(() => {
          setPopup({ ...popup, open: false });
          onLogout();
        }, 3000);
      } else {
        setPopup({
          open: true,
          type: "error",
          title: "Logout Gagal",
          message: "Terjadi kesalahan saat logout. Coba lagi.",
        });
      }
    } catch (err) {
      setPopup({
        open: true,
        type: "error",
        title: "Logout Error",
        message: err.message || "Terjadi kesalahan saat memproses logout.",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col transition">
      {/* 🔹 Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 bg-blue-600 rounded-md text-white text-xl font-semibold">
            SA
          </div>
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Simple Authentication
          </span>
        </div>

        <div className="relative flex items-center gap-2" ref={menuRef}>
     
          {/* Tombol profil */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
             Hai👋, {profile?.name}!
            </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flexh-10 items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition border-1.5"
          >
             <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>

          {/* dropdown menu */}
          {menuOpen && (
            <div className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-50 transition-transform origin-top animate-dropdown">

              <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {profile?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {profile?.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3">
                {/* Tombol dark mode di navbar */}
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <DarkModeToggle />
                </div>


                <button
                  onClick={confirmLogout}
                  className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 p-2 rounded-lg transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 🔹 Konten utama */}
      <main className="flex-grow p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Selamat Datang 👋
          </h1>
          {profile && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Hai,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                {profile.name}
              </span>
              ! Kamu berhasil login ke{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Simple Authentication Dashboard
              </span>
              .
            </p>
          )}
        </div>
      </main>

      {/* 🔹 Popup global */}
      <Popup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => setPopup({ ...popup, open: false })}
        onConfirm={popup.onConfirm}
      />
    </div>
  );
};

export default Dashboard;
