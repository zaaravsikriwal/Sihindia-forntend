import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="font-sans bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-emerald-500 to-sky-500 text-white min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_70%)]"></div>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide relative"
        >
          SHSEWS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl drop-shadow-lg leading-relaxed relative"
        >
          Smart Health Surveillance & Early Warning System <br />
          Detect • Monitor • Prevent water-borne diseases.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Link
            to="/login"
            className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition transform duration-300"
          >
            Login / Signup
          </Link>
        </motion.div>

        <div className="mt-10 flex space-x-4 text-lg relative">
          <span className="bg-white text-emerald-600 px-5 py-2 rounded-full shadow-md font-medium">
            ASHA Worker
          </span>
          <span className="bg-white text-indigo-600 px-5 py-2 rounded-full shadow-md font-medium">
            Government Official
          </span>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-24 text-gray-50"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              fill="currentColor"
              d="M985.66,92.83C906.67,72,823.78,48,739.85,48c-80.29,0-159,24-239.26,47.49C407.22,121.05,326.71,144,245,144c-82.41,0-163.63-23.08-244-47.57V0H1200V27.35C1131.7,61.77,1060.22,104,985.66,92.83Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          What SHSEWS Does
        </motion.h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              emoji: "🧑‍⚕️",
              title: "Community Health",
              text: "Collect health data from clinics, ASHA workers, and volunteers. Track symptoms in real-time.",
              color: "text-emerald-600",
            },
            {
              emoji: "💧",
              title: "Water Monitoring",
              text: "Monitor water quality with IoT sensors or test kits. Detect contamination early.",
              color: "text-indigo-600",
            },
            {
              emoji: "📢",
              title: "Early Warning",
              text: "Get AI-based alerts about outbreaks and respond faster.",
              color: "text-amber-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 text-center"
            >
              <span className="text-5xl mb-4 inline-block">{item.emoji}</span>
              <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Key Features
        </motion.h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              emoji: "📝",
              title: "ASHA Reporting",
              text: "Collect patient symptoms, water tests & visits. Works offline too.",
              bg: "bg-emerald-50",
              color: "text-emerald-600",
            },
            {
              emoji: "📊",
              title: "Gov Dashboard",
              text: "Visualize hotspots, assign interventions, track outbreaks in real-time.",
              bg: "bg-indigo-50",
              color: "text-indigo-600",
            },
            {
              emoji: "🎯",
              title: "Community Alerts",
              text: "Notify villagers about hygiene, water safety, and warnings in local languages.",
              bg: "bg-amber-50",
              color: "text-amber-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`flex flex-col items-center text-center p-8 ${item.bg} rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition duration-300`}
            >
              <span className="text-5xl mb-4">{item.emoji}</span>
              <h3 className={`font-bold text-xl mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 via-emerald-500 to-sky-500 text-white py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 drop-shadow"
        >
          Be a Part of the Change
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 max-w-2xl mx-auto text-lg opacity-90 leading-relaxed"
        >
          Login as ASHA Worker or Government Official to start protecting your community today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/login"
            className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition transform duration-300"
          >
            Login Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 px-6 text-center text-sm">
        <p>© 2025 SHSEWS | Smart Health Surveillance & Early Warning System</p>
      </footer>
    </div>
  );
}
