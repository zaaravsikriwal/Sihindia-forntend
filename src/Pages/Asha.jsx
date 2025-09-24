import { useState } from "react";

export default function ASHAWorkerDashboard() {
  // Sample data
  const [alerts] = useState([
    { id: 1, message: "Cholera outbreak in Village B", level: "High" },
    { id: 2, message: "Routine water testing required", level: "Medium" },
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: "Patient A", symptoms: "Fever, Loose motion", status: "Pending", followUp: "Tomorrow" },
    { id: 2, name: "Patient B", symptoms: "Vomiting", status: "Completed", followUp: "None" },
  ]);

  const [waterSources, setWaterSources] = useState([
    { id: 1, source: "Well 1", pH: 6.8, chlorine: "Normal", risk: "Medium" },
    { id: 2, source: "Tank 3", pH: 7.2, chlorine: "Low", risk: "High" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, task: "Visit Village A", completed: false },
    { id: 2, task: "Collect water sample from Well 1", completed: true },
  ]);

  const [awareness] = useState([
    "Boil water before drinking",
    "Regular handwashing",
    "Use clean utensils",
    "Attend hygiene awareness campaign",
  ]);

  // Function to toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-700">ASHA Worker Dashboard</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500">Logout</button>
      </header>

      {/* Alerts */}
      <section className="mb-6 grid md:grid-cols-2 gap-4">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg text-white font-bold ${
              alert.level === "High" ? "bg-red-500" :
              alert.level === "Medium" ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            {alert.message}
          </div>
        ))}
      </section>

      {/* Stats Cards */}
      <section className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Pending Reports</h2>
          <p className="text-gray-700 text-2xl">{patients.filter(p => p.status === "Pending").length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Water Tests</h2>
          <p className="text-gray-700 text-2xl">{waterSources.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Tasks Today</h2>
          <p className="text-gray-700 text-2xl">{tasks.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Points Earned</h2>
          <p className="text-gray-700 text-2xl">150</p>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">

        {/* Patient Reports */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Patient Reports</h2>
          {patients.map(p => (
            <div key={p.id} className="border p-3 rounded mb-3">
              <h3 className="font-bold">{p.name}</h3>
              <p>Symptoms: {p.symptoms}</p>
              <p>Follow-up: {p.followUp}</p>
              <p className={`text-sm font-semibold ${p.status === "Pending" ? "text-red-500" : "text-green-600"}`}>Status: {p.status}</p>
              <button className="mt-2 bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-500 text-sm">Update Status</button>
            </div>
          ))}
        </div>

        {/* Household Visits / Tasks */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Daily Tasks & Visits</h2>
          {tasks.map(task => (
            <div key={task.id} className="flex justify-between items-center p-2 border rounded mb-2">
              <p className={`${task.completed ? "line-through text-gray-400" : ""}`}>{task.task}</p>
              <button
                onClick={() => toggleTask(task.id)}
                className={`px-3 py-1 rounded text-white ${task.completed ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-500"}`}
              >
                {task.completed ? "Done" : "Mark Done"}
              </button>
            </div>
          ))}
        </div>

        {/* Water Quality */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Water Quality Monitoring</h2>
          {waterSources.map(w => (
            <div key={w.id} className="border p-3 rounded mb-3">
              <h3 className="font-bold">{w.source}</h3>
              <p>pH: {w.pH}</p>
              <p>Chlorine: {w.chlorine}</p>
              <p>Risk: <span className={`${w.risk === "High" ? "text-red-600" : w.risk === "Medium" ? "text-yellow-500" : "text-green-600"} font-bold`}>{w.risk}</span></p>
              <button className="mt-2 bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-500 text-sm">Update Test</button>
            </div>
          ))}
        </div>
      </section>

      {/* Awareness & Gamification */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Awareness */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Awareness / Education</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {awareness.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Gamification */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Gamification / Leaderboard</h2>
          <p>Earn points by submitting reports and completing tasks.</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Worker A - 250 pts</li>
            <li>Worker B - 200 pts</li>
            <li>Worker C - 180 pts</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
