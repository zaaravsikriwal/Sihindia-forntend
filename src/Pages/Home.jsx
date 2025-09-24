import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-400 to-amber-400 text-white min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          SHSEWS
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl drop-shadow">
          Smart Health Surveillance & Early Warning System for water-borne diseases.
          Monitor, prevent, and protect your community with ease.
        </p>
        <Link
          to="/login"
          className="bg-white text-teal-600 font-bold px-8 py-4 rounded-full shadow-xl hover:scale-105 transition transform"
        >
          Login / Signup
        </Link>
        <div className="mt-10 flex space-x-4 text-lg">
          <span className="bg-white text-teal-600 px-4 py-2 rounded-full shadow-md">ASHA Worker</span>
          <span className="bg-white text-amber-600 px-4 py-2 rounded-full shadow-md">Government Official</span>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What SHSEWS Does
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <span className="text-5xl mb-4 inline-block">🧑‍⚕️</span>
            <h3 className="text-xl font-semibold mb-2 text-teal-600">Community Health</h3>
            <p>
              Collect health data from clinics, ASHA workers, and volunteers via mobile apps or SMS. 
              Track symptoms in real-time.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <span className="text-5xl mb-4 inline-block">💧</span>
            <h3 className="text-xl font-semibold mb-2 text-amber-600">Water Monitoring</h3>
            <p>
              Monitor water quality through IoT sensors or low-cost test kits. Detect contamination before it spreads.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <span className="text-5xl mb-4 inline-block">📢</span>
            <h3 className="text-xl font-semibold mb-2 text-teal-600">Early Warning</h3>
            <p>
              Receive AI-based alerts about potential disease outbreaks. Take action before it becomes critical.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Key Features
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-6 bg-teal-50 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
            <span className="text-5xl mb-4">📝</span>
            <h3 className="font-bold text-xl mb-2 text-teal-600">ASHA Reporting</h3>
            <p>
              Collect patient symptoms, water tests, and household visits. Works offline too.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-amber-50 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
            <span className="text-5xl mb-4">📊</span>
            <h3 className="font-bold text-xl mb-2 text-amber-600">Gov Dashboard</h3>
            <p>
              Visualize hotspots, assign interventions, and track outbreak trends in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-teal-50 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
            <span className="text-5xl mb-4">🎯</span>
            <h3 className="font-bold text-xl mb-2 text-teal-600">Community Alerts</h3>
            <p>
              Notify villagers about water safety, hygiene, and outbreak warnings in local languages.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-teal-400 to-amber-400 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 drop-shadow">Be a Part of the Change</h2>
        <p className="mb-8 max-w-2xl mx-auto drop-shadow">
          Login as ASHA Worker or Government Official to start protecting your community today.
        </p>
        <Link
          to="/login"
          className="bg-white text-teal-600 font-bold px-8 py-4 rounded-full shadow-xl hover:scale-105 transition transform"
        >
          Login Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6 px-6 text-center">
        <p>© 2025 SHSEWS | Smart Health Surveillance & Early Warning System</p>
      </footer>
    </div>
  );
}
