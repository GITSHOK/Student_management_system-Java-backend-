import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
} from "../services/api";

function Students() {

    // =========================
    // STATE
    // =========================

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [classroom, setClassroom] = useState("");
    const [year, setYear] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [error, setError] = useState("");


    // =========================
    // LOAD STUDENTS
    // =========================

    async function loadStudents() {

        try {

            setError("");

            const data = await getStudents();

            setStudents(data);

        } catch (error) {

            console.error(error);

            setError("Failed to load students");

        }
    }


    // Load students when page opens

    useEffect(() => {

        loadStudents();

    }, []);


    // =========================
    // CLEAR FORM
    // =========================

    function clearForm() {

        setName("");
        setRoll("");
        setClassroom("");
        setYear("");

        setEditingId(null);

    }


    // =========================
    // ADD / UPDATE STUDENT
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");


        const student = {

            name: name,

            roll: Number(roll),

            classroom: classroom,

            year: Number(year)

        };


        try {

            // UPDATE

            if (editingId) {

                await updateStudent(
                    editingId,
                    student
                );

            }

            // ADD

            else {

                await addStudent(student);

            }


            clearForm();

            await loadStudents();


        } catch (error) {

            console.error(error);

            setError("You got na access. Kindly contact admin to gain priviledges");

        }

    }


    // =========================
    // EDIT STUDENT
    // =========================

    function handleEdit(student) {

        setEditingId(student.id);

        setName(student.name);

        setRoll(student.roll);

        setClassroom(student.classroom);

        setYear(student.year);

    }


    // =========================
    // DELETE STUDENT
    // =========================

    async function handleDelete(id) {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this student?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            setError("");

            await deleteStudent(id);

            await loadStudents();

        } catch (error) {

            console.error(error);

            setError("Failed to delete student");

        }

    }


    // =========================
    // UI
    // =========================

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

            <Navbar />


            <main className="max-w-6xl mx-auto px-6 py-10">


                {/* PAGE TITLE */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Students
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Manage your students
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">

                        {error}

                    </div>

                )}


                {/* =========================
                    ADD / UPDATE FORM
                ========================= */}

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8 transition-colors">

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">

                        {editingId
                            ? "Update Student"
                            : "Add Student"
                        }

                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >


                        {/* NAME */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>

                            <input
                                type="text"
                                placeholder="Student name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* ROLL */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Roll Number
                            </label>

                            <input
                                type="number"
                                placeholder="Roll number"
                                value={roll}
                                onChange={(e) =>
                                    setRoll(e.target.value)
                                }
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* CLASSROOM */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Classroom
                            </label>

                            <input
                                type="text"
                                placeholder="Classroom"
                                value={classroom}
                                onChange={(e) =>
                                    setClassroom(e.target.value)
                                }
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* YEAR */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Year
                            </label>

                            <input
                                type="number"
                                placeholder="Year"
                                value={year}
                                onChange={(e) =>
                                    setYear(e.target.value)
                                }
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="md:col-span-2 flex gap-3 mt-2">


                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                            >

                                {editingId
                                    ? "Update Student"
                                    : "Add Student"
                                }

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    onClick={clearForm}
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </div>


                {/* =========================
                    STUDENTS TABLE
                ========================= */}

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden transition-colors">


                    {/* TABLE TITLE */}

                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">

                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            All Students
                        </h2>

                    </div>


                    {/* NO STUDENTS */}

                    {students.length === 0 ? (

                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">

                            No students found.

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">


                                {/* HEADER */}

                                <thead className="bg-gray-50 dark:bg-gray-800">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Name
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Roll
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Classroom
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Year
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                {/* BODY */}

                                <tbody>

                                    {students.map((student) => (

                                        <tr
                                            key={student.id}
                                            className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                        >


                                            {/* NAME */}

                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-200">

                                                {student.name}

                                            </td>


                                            {/* ROLL */}

                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-200">

                                                {student.roll}

                                            </td>


                                            {/* CLASSROOM */}

                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-200">

                                                {student.classroom}

                                            </td>


                                            {/* YEAR */}

                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-200">

                                                {student.year}

                                            </td>


                                            {/* ACTIONS */}

                                            <td className="px-6 py-4">

                                                <div className="flex gap-2">


                                                    {/* EDIT */}

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(student)
                                                        }
                                                        className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600 transition"
                                                    >

                                                        Edit

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(student.id)
                                                        }
                                                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
                                                    >

                                                        Delete

                                                    </button>


                                                </div>

                                            </td>


                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>

    );

}

export default Students;