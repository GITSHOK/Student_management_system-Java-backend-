import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors">

            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/dashboard"
                    className="text-xl font-bold text-blue-600"
                >
                    NishTool
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/students"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                    >
                        Students
                    </Link>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-xl hover:scale-110 transition"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;