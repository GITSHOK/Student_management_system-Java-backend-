import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                <div className="mb-10">

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Student Management System
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400">
                        Welcome back! Manage your students from here.
                    </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Students card */}

                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">

                        <h2 className="text-xl font-semibold">
                            Students
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View and manage your students.
                        </p>

                        <button
                            onClick={() => navigate("/students")}
                            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Manage Students
                        </button>

                    </div>


                    {/* Account card */}

                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <h2 className="text-xl font-semibold">
                            Account
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You are currently logged in.
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;