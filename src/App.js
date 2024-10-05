import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addStudent,
  updateStudent,
  deleteStudent,
} from "./redux/slices/studentSlice";

function App() {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const [student, setStudent] = useState({
    id: "",
    name: "",
    age: "",
    rollNumber: "",
    batch: "",
  });
  const [editing, setEditing] = useState(false);

  const handleAddOrUpdate = () => {
    if (editing) {
      dispatch(updateStudent(student));
      setEditing(false);
    } else {
      dispatch(addStudent({ ...student, id: Date.now() }));
    }
    setStudent({ id: "", name: "", age: "", rollNumber: "", batch: "" });
  };

  const handleEdit = (student) => {
    setStudent(student);
    setEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-gray-200 p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Student Management
        </h1>
        <div className="mb-4">
          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Name"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Age"
            value={student.age}
            onChange={(e) => setStudent({ ...student, age: e.target.value })}
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Roll Number"
            value={student.rollNumber}
            onChange={(e) =>
              setStudent({ ...student, rollNumber: e.target.value })
            }
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Batch"
            value={student.batch}
            onChange={(e) => setStudent({ ...student, batch: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleAddOrUpdate}
          >
            {editing ? "Update Student" : "Add Student"}
          </button>
        </div>

        {/* Table to display student data */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">Roll #</th>
                <th className="py-3 px-6 text-left">Batch</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{student.name}</td>
                  <td className="py-3 px-6 text-left">{student.age}</td>
                  <td className="py-3 px-6 text-left">{student.rollNumber}</td>
                  <td className="py-3 px-6 text-left">{student.batch}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => dispatch(deleteStudent(student.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
