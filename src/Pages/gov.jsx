import { useState } from "react";

export default function GovDashboard() {
  // Sample Data
  const [outbreaks] = useState([
    { id: 1, village: "Village A", disease: "Cholera", cases: 45, level: "High" },
    { id: 2, village: "Village B", disease: "Typhoid", cases: 12, level: "Medium" },
    { id: 3, village: "Village C", disease: "Diarrhea", cases: 5, level: "Low" },
  ]);

  const [interventions, setInterventions] = useState([
    { id: 1, action: "Send chlorine kits to Village A", assignedTo: "ASHA Worker A", status: "Pending" },
    { id: 2, action: "Conduct awareness campaign in Village B", assignedTo: "ASHA Worker B", status: "Completed" },
  ]);

  const [waterTrends] = useState([
    { village: "Village A", pH: 6.8, chlorine: "Low", contaminationRisk: "High" },
    { village: "Village B", pH: 7.0, chlorine: "Normal", contaminationRisk: "Medium" },
    { village: "Village C", pH: 7.2, chlorine: "Normal", contaminationRisk: "Low" },
  ]);

  const [reports] = useState([
    { month: "August", cholera: 30, typhoid: 15, diarrhea: 40 },
    { month: "September", cholera: 25, typhoid: 10, diarrhea: 35 },
  ]);

  // Toggle intervention status
  const toggleStatus = (id) => {
    setInterventions(interventions.map(i => i.id === id ? { ...i, status: i.status === "Pending" ? "Completed" : "Pending" } : i));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Government Portal Dashboard</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Logout</button>
      </header>

      {/* Outbreak Alerts */}
      <section className="mb-6 grid md:grid-cols-3 gap-4">
        {outbreaks.map(o => (
          <div
            key={o.id}
            className={`p-4 rounded-lg text-white font-bold ${
              o.level === "High" ? "bg-red-500" :
              o.level === "Medium" ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            <p>{o.disease} in {o.village}</p>
            <p>Cases: {o.cases}</p>
            <p>Level: {o.level}</p>
          </div>
        ))}
      </section>

      {/* Stats Cards */}
      <section className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Active Outbreaks</h2>
          <p className="text-gray-700 text-2xl">{outbreaks.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Pending Interventions</h2>
          <p className="text-gray-700 text-2xl">{interventions.filter(i => i.status === "Pending").length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Water Sources Monitored</h2>
          <p className="text-gray-700 text-2xl">{waterTrends.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Monthly Reports</h2>
          <p className="text-gray-700 text-2xl">{reports.length}</p>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Intervention Planner */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Intervention Planner</h2>
          {interventions.map(i => (
            <div key={i.id} className="flex justify-between items-center p-3 border rounded mb-3">
              <div>
                <p className="font-bold">{i.action}</p>
                <p className="text-gray-600">Assigned to: {i.assignedTo}</p>
                <p className={`font-semibold ${i.status === "Pending" ? "text-red-500" : "text-green-600"}`}>Status: {i.status}</p>
              </div>
              <button
                onClick={() => toggleStatus(i.id)}
                className={`px-3 py-1 rounded text-white ${i.status === "Pending" ? "bg-indigo-600 hover:bg-indigo-500" : "bg-green-600 hover:bg-green-500"}`}
              >
                Toggle
              </button>
            </div>
          ))}
        </div>

        {/* Water & Disease Trends */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Water & Health Trends</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Village</th>
                <th className="p-2 border">pH</th>
                <th className="p-2 border">Chlorine</th>
                <th className="p-2 border">Contamination Risk</th>
              </tr>
            </thead>
            <tbody>
              {waterTrends.map(w => (
                <tr key={w.village} className="hover:bg-gray-50">
                  <td className="p-2 border">{w.village}</td>
                  <td className="p-2 border">{w.pH}</td>
                  <td className="p-2 border">{w.chlorine}</td>
                  <td className={`p-2 border font-bold ${w.contaminationRisk === "High" ? "text-red-600" : w.contaminationRisk === "Medium" ? "text-yellow-500" : "text-green-600"}`}>{w.contaminationRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Monthly Reports / Charts */}
      <section className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Monthly Health Reports</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Cholera</th>
              <th className="p-2 border">Typhoid</th>
              <th className="p-2 border">Diarrhea</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.month} className="hover:bg-gray-50">
                <td className="p-2 border">{r.month}</td>
                <td className="p-2 border">{r.cholera}</td>
                <td className="p-2 border">{r.typhoid}</td>
                <td className="p-2 border">{r.diarrhea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
