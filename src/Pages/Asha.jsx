import React, { useRef, useState } from "react";
import {
  Bell, Users, Droplets, CheckSquare, TrendingUp, BarChart3, Home,
  FileText, Activity, Heart, Settings, HelpCircle, LogOut, X, Menu,
  Sun, Moon, AlertTriangle, Thermometer, Beaker, Eye, Edit3, Save
} from "lucide-react";

export default function ASHAWorkerDashboard() {
  // UI state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedWaterSource, setSelectedWaterSource] = useState(null);

  // filters & navigation
  const [filter, setFilter] = useState(null); // e.g. { type: 'status', value: 'Critical' }
  const dashboardRef = useRef(null);
  const patientsRef = useRef(null);
  const waterRef = useRef(null);
  const tasksRef = useRef(null);
  const alertsRef = useRef(null);
  const analyticsRef = useRef(null);
  const feedbackRef = useRef(null);

  // ASHA Worker Profile
  const ashaWorker = {
    name: "Dr. Priya Sharma",
    id: "ASHA-001",
    village: "Dibrugarh, Assam",
    contact: "+91 98765-43210"
  };

  // Sample data
  const [alerts] = useState([
    { id: 1, message: "Diarrhea outbreak detected in Village B - 15 cases reported", level: "High", time: "2 mins ago" },
    { id: 2, message: "Water contamination alert from Community Well 3", level: "High", time: "15 mins ago" },
    { id: 3, message: "Cholera vaccination drive scheduled for tomorrow", level: "Medium", time: "1 hour ago" },
    { id: 4, message: "Elevated turbidity recorded at Hand Pump 4", level: "Low", time: "Yesterday" },
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 34,
      gender: "Male",
      symptoms: "Severe diarrhea, vomiting, dehydration",
      status: "Critical",
      followUp: "Tomorrow 9 AM",
      village: "Village A",
      contact: "+91 98765-11111",
      reportDate: "2024-09-25",
      temperature: "102°F",
      bloodPressure: "90/60",
      waterSource: "Community Well 1"
    },
    {
      id: 2,
      name: "Anita Singh",
      age: 28,
      gender: "Female",
      symptoms: "Stomach pain, loose motions",
      status: "Stable",
      followUp: "Next Week",
      village: "Village B",
      contact: "+91 98765-22222",
      reportDate: "2024-09-24",
      temperature: "99°F",
      bloodPressure: "110/70",
      waterSource: "Hand Pump 2"
    },
  ]);

  const [waterSources, setWaterSources] = useState([
    {
      id: 1,
      source: "Community Well 1",
      location: "Village Center",
      pH: 6.8,
      chlorine: "Low",
      bacteria: "High",
      turbidity: "15 NTU",
      risk: "Critical",
      lastTested: "Today",
      testerName: "Lab Tech Raj"
    },
    {
      id: 2,
      source: "Hand Pump 2",
      location: "Village B",
      pH: 7.2,
      chlorine: "Normal",
      bacteria: "Medium",
      turbidity: "8 NTU",
      risk: "Medium",
      lastTested: "2 days ago",
      testerName: "ASHA Worker"
    },
  ]);

  // Community feedback (replaces Daily Tasks UI)
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: "Sita Devi", village: "Village A", message: "Need more ORS packets", date: "2024-09-24" },
    { id: 2, name: "Ramesh", village: "Village C", message: "Water at well smells bad sometimes", date: "2024-09-23" }
  ]);

  // Forms
  const [patientForm, setPatientForm] = useState({ symptoms: '', temperature: '', bloodPressure: '', status: '', followUp: '', notes: '' });
  const [waterTestForm, setWaterTestForm] = useState({ pH: '', chlorine: '', bacteria: '', turbidity: '', testerName: '', notes: '' });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // navigation helper — scroll to section and optionally set filter
  const goToSection = (section, optionalFilter = null) => {
    const map = {
      dashboard: dashboardRef,
      patients: patientsRef,
      water: waterRef,
      feedback: feedbackRef,
      alerts: alertsRef,
      analytics: analyticsRef,
    };
    const ref = map[section];
    if (optionalFilter) setFilter(optionalFilter);
    else setFilter(null);

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openPatientModal = (patient, modalType) => {
    setSelectedPatient(patient);
    setPatientForm({
      symptoms: patient.symptoms,
      temperature: patient.temperature,
      bloodPressure: patient.bloodPressure,
      status: patient.status,
      followUp: patient.followUp,
      notes: ''
    });
    setActiveModal(modalType);
  };

  const openWaterModal = (waterSource) => {
    setSelectedWaterSource(waterSource);
    setWaterTestForm({
      pH: waterSource.pH.toString(),
      chlorine: waterSource.chlorine,
      bacteria: waterSource.bacteria,
      turbidity: waterSource.turbidity,
      testerName: ashaWorker.name,
      notes: ''
    });
    setActiveModal('waterTest');
  };

  const updatePatientStatus = () => {
    setPatients(patients.map(p =>
      p.id === selectedPatient.id
        ? {
            ...p,
            symptoms: patientForm.symptoms,
            temperature: patientForm.temperature,
            bloodPressure: patientForm.bloodPressure,
            status: patientForm.status,
            followUp: patientForm.followUp
          }
        : p
    ));
    setActiveModal(null);
  };

  const updateWaterTest = () => {
    setWaterSources(waterSources.map(w =>
      w.id === selectedWaterSource.id
        ? {
            ...w,
            pH: parseFloat(waterTestForm.pH),
            chlorine: waterTestForm.chlorine,
            bacteria: waterTestForm.bacteria,
            turbidity: waterTestForm.turbidity,
            lastTested: "Today",
            testerName: waterTestForm.testerName,
            risk: waterTestForm.bacteria === "High" || parseFloat(waterTestForm.pH) < 6.5 ? "Critical" : "Medium"
          }
        : w
    ));
    setActiveModal(null);
  };

  // calculated stats
  const activeCasesCount = patients.filter(p => p.status === 'Critical').length;
  const pendingTasksCount = 3; // placeholder — in a real app this would be dynamic
  const completionRate = Math.round((1 / 4) * 100); // placeholder

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    sidebarBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  };

  // Sidebar nav items (map to refs)
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', section: 'dashboard' },
    { icon: Users, label: 'Patient Reports', section: 'patients', count: patients.length },
    { icon: Droplets, label: 'Water Quality', section: 'water', count: waterSources.length },
    { icon: BarChart3, label: 'Analytics', section: 'analytics' },
    { icon: Bell, label: 'Alerts', section: 'alerts', count: alerts.length },
    { icon: FileText, label: 'Reports', section: 'reports' },
    { icon: Activity, label: 'Health Surveillance', section: 'dashboard' },
    { icon: Heart, label: 'Awareness Campaigns', section: 'dashboard' },
    { icon: Settings, label: 'Settings', section: 'settings' },
    { icon: HelpCircle, label: 'Help & Support', section: 'support' }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`}> 
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full ${themeClasses.sidebarBg} ${themeClasses.border} border-r transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`font-bold ${themeClasses.text}`}>Health Surveillance</h2>
                  <p className={`text-xs ${themeClasses.textSecondary}`}>ASHA Portal</p>
                </div>
              </div>
            )}

            <button onClick={toggleSidebar} className={`p-2 rounded-lg ${themeClasses.hover} ${themeClasses.text}`}>
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-auto">
            {sidebarItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => goToSection(item.section)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${themeClasses.text} ${themeClasses.hover}`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </div>
                {sidebarOpen && item.count && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.count}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Profile box — pinned to bottom but inside sidebar padding so it doesn't overlap */}
          <div className={`mt-4 ${themeClasses.cardBg} rounded-lg ${themeClasses.border} border p-3`}>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                {ashaWorker.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className={`font-semibold ${themeClasses.text} text-sm`}>{ashaWorker.name}</p>
                <p className={`${themeClasses.textSecondary} text-xs`}>{ashaWorker.id}</p>
                <p className={`${themeClasses.textSecondary} text-xs`}>{ashaWorker.village}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => alert('Logging out...')} className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded ${themeClasses.hover} ${themeClasses.text} text-sm`}>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content area */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <header className={`${themeClasses.cardBg} ${themeClasses.border} border-b px-6 py-4 sticky top-0 z-20`}> 
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Health Surveillance Dashboard</h1>
              <p className={`${themeClasses.textSecondary}`}>Welcome back, {ashaWorker.name.split(' ')[0]}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button onClick={toggleTheme} className={`p-2 rounded-lg ${themeClasses.hover} ${themeClasses.text}`}>
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="relative">
                  <Bell className={`w-6 h-6 ${themeClasses.text} cursor-pointer`} onClick={() => goToSection('alerts')} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{alerts.length}</span>
                </div>
              </div>

              {/* Settings dropdown (simple) */}
              <div className="relative">
                <Settings className={`w-6 h-6 ${themeClasses.text} cursor-pointer`} />
                <div className={`absolute right-0 mt-2 w-56 ${themeClasses.cardBg} ${themeClasses.border} border rounded shadow-lg p-3 hidden group-hover:block`}>
                  {/* We keep this simple — you can later replace with better dropdown logic */}
                  <div className="space-y-2">
                    <div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Language</p>
                      <select className={`w-full p-2 mt-1 rounded ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} defaultValue="en">
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                        <option value="as">অসমীয়া</option>
                      </select>
                    </div>
                    <div>
                      <button onClick={() => alert('Open accessibility settings')} className={`w-full p-2 rounded ${themeClasses.hover} ${themeClasses.text}`}>Accessibility</button>
                    </div>
                    <div>
                      <button onClick={() => alert('Open advanced settings')} className={`w-full p-2 rounded ${themeClasses.hover} ${themeClasses.text}`}>Advanced</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div ref={dashboardRef} className="p-6 space-y-8">
          {/* Hero Stats — these come first now */}
          <section className="grid md:grid-cols-4 gap-6" aria-label="Quick stats">
            <div onClick={() => goToSection('patients', { type: 'status', value: 'Critical' })} className={`cursor-pointer ${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <h3 className={`${themeClasses.textSecondary} text-sm font-medium mb-2`}>Active Cases</h3>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>{activeCasesCount}</p>
              <p className={`${themeClasses.textSecondary} text-xs mt-2`}>Click to view case details</p>
            </div>

            <div onClick={() => goToSection('water')} className={`cursor-pointer ${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <Droplets className="w-8 h-8 text-blue-500" />
              <h3 className={`${themeClasses.textSecondary} text-sm font-medium mb-2`}>Water Sources</h3>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>{waterSources.length}</p>
              <p className={`${themeClasses.textSecondary} text-xs mt-2`}>Last tested values shown below</p>
            </div>

            <div onClick={() => goToSection('feedback')} className={`cursor-pointer ${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <CheckSquare className="w-8 h-8 text-orange-500" />
              <h3 className={`${themeClasses.textSecondary} text-sm font-medium mb-2`}>Pending Actions</h3>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>{pendingTasksCount}</p>
              <p className={`${themeClasses.textSecondary} text-xs mt-2`}>Community feedback & follow-ups</p>
            </div>

            <div onClick={() => goToSection('analytics')} className={`cursor-pointer ${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <TrendingUp className="w-8 h-8 text-green-500" />
              <h3 className={`${themeClasses.textSecondary} text-sm font-medium mb-2`}>Completion Rate</h3>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>{completionRate}%</p>
              <p className={`${themeClasses.textSecondary} text-xs mt-2`}>Overview of completed activities</p>
            </div>
          </section>

          {/* Alerts with scroll if many */}
          <section ref={alertsRef} className={`${themeClasses.cardBg} ${themeClasses.border} border p-4 rounded-lg`}> 
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-lg font-bold ${themeClasses.text}`}>Critical Alerts</h2>
              <button onClick={() => goToSection('alerts')} className={`text-sm ${themeClasses.textSecondary}`}>View all</button>
            </div>

            <div className="max-h-40 overflow-auto space-y-2 pr-2">
              {alerts.map(alert => (
                <div key={alert.id} className={`${themeClasses.cardBg} rounded-lg ${themeClasses.border} border p-3 flex items-start justify-between`}> 
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 ${alert.level === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <div>
                      <p className={`${themeClasses.text} font-semibold`}>{alert.message}</p>
                      <p className={`${themeClasses.textSecondary} text-xs`}>{alert.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.level === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{alert.level}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <section className="grid lg:grid-cols-3 gap-8">
            {/* Patient Reports */}
            <div ref={patientsRef} className={`${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${themeClasses.text}`}>Patient Reports</h2>
                {/* Removed Add Patient as requested */}
              </div>

              {filter && filter.type === 'status' && (
                <div className={`mb-4 p-3 rounded ${themeClasses.border} border ${themeClasses.cardBg}`}>
                  <p className={`${themeClasses.textSecondary} text-sm`}>Showing patients filtered by <strong>{filter.value}</strong></p>
                  <button onClick={() => setFilter(null)} className={`text-sm mt-2 ${themeClasses.text} ${themeClasses.hover}`}>Clear filter</button>
                </div>
              )}

              <div className="space-y-4 max-h-[55vh] overflow-auto pr-2">
                {patients.filter(p => (filter && filter.type === 'status') ? p.status === filter.value : true).map(p => (
                  <div key={p.id} className={`${themeClasses.border} border rounded-lg p-4`}> 
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`font-bold ${themeClasses.text}`}>{p.name}</h3>
                        <p className={`${themeClasses.textSecondary} text-sm`}>{p.village} • Age {p.age}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span>
                    </div>

                    <p className={`${themeClasses.textSecondary} text-sm mb-3`}><strong>Symptoms:</strong> {p.symptoms}</p>

                    <div className="flex space-x-2">
                      <button onClick={() => openPatientModal(p, 'update')} className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors flex items-center">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Update Status
                      </button>
                      <button onClick={() => openPatientModal(p, 'view')} className={`border px-3 py-2 rounded text-sm ${themeClasses.text} ${themeClasses.hover} transition-colors flex items-center`}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback (replaces Daily Tasks) */}
            <div ref={feedbackRef} className={`${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <h2 className={`text-xl font-bold ${themeClasses.text} mb-4`}>Community Feedback</h2>
              <div className="space-y-4 max-h-[55vh] overflow-auto pr-2">
                {feedbacks.map(f => (
                  <div key={f.id} className={`${themeClasses.border} border rounded-lg p-3`}> 
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className={`font-medium ${themeClasses.text}`}>{f.name} <span className={`${themeClasses.textSecondary} text-xs`}> • {f.village}</span></p>
                        <p className={`${themeClasses.textSecondary} text-xs`}>{f.date}</p>
                      </div>
                    </div>
                    <p className={`${themeClasses.textSecondary} text-sm mb-3`}>{f.message}</p>
                    <div className="flex space-x-2">
                      <button onClick={() => alert('Marking as done')} className={`px-3 py-2 rounded text-sm ${themeClasses.text} ${themeClasses.hover}`}>Acknowledge</button>
                      <button onClick={() => alert('Open reply modal')} className={`px-3 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600`}>Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Quality */}
            <div ref={waterRef} className={`${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${themeClasses.text}`}>Water Quality Monitoring</h2>
                <button onClick={() => goToSection('water')} className={`text-sm ${themeClasses.textSecondary}`}>Refresh</button>
              </div>

              <div className="space-y-4 max-h-[55vh] overflow-auto pr-2">
                {waterSources.map(w => (
                  <div key={w.id} className={`${themeClasses.border} border rounded-lg p-4`}> 
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`font-bold ${themeClasses.text}`}>{w.source}</h3>
                        <p className={`${themeClasses.textSecondary} text-sm`}>{w.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${w.risk === 'Critical' ? 'bg-red-100 text-red-800 animate-pulse' : w.risk === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{w.risk}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div>
                        <p className={`${themeClasses.textSecondary}`}>pH: {w.pH}</p>
                        <p className={`${themeClasses.textSecondary}`}>Chlorine: {w.chlorine}</p>
                      </div>
                      <div>
                        <p className={`${themeClasses.textSecondary}`}>Bacteria: {w.bacteria}</p>
                        <p className={`${themeClasses.textSecondary}`}>Last Test: {w.lastTested}</p>
                      </div>
                    </div>
                    <button onClick={() => openWaterModal(w)} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <Beaker className="w-4 h-4 mr-2" />
                      Update Test Results
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Analytics section */}
          <section ref={analyticsRef} className={`${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-lg`}> 
            <h2 className={`text-xl font-bold ${themeClasses.text} mb-4`}>Analytics</h2>
            <p className={`${themeClasses.textSecondary}`}>Quick summary of trends — (placeholder). You can plug charts here.</p>
          </section>

        </div>
      </main>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${themeClasses.cardBg} rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${themeClasses.text}`}>
                {activeModal === 'update' && 'Update Patient Status'}
                {activeModal === 'view' && 'Patient Details'}
                {activeModal === 'waterTest' && 'Update Water Test Results'}
              </h3>
              <button onClick={() => setActiveModal(null)} className={`${themeClasses.text}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Patient Update Form */}
            {activeModal === 'update' && (
              <form onSubmit={(e) => { e.preventDefault(); updatePatientStatus(); }} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Symptoms</label>
                  <textarea value={patientForm.symptoms} onChange={(e) => setPatientForm({ ...patientForm, symptoms: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} rows="3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Temperature</label>
                    <input type="text" value={patientForm.temperature} onChange={(e) => setPatientForm({ ...patientForm, temperature: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} placeholder="102°F" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Blood Pressure</label>
                    <input type="text" value={patientForm.bloodPressure} onChange={(e) => setPatientForm({ ...patientForm, bloodPressure: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} placeholder="120/80" />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Status</label>
                  <select value={patientForm.status} onChange={(e) => setPatientForm({ ...patientForm, status: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`}>
                    <option value="Critical">Critical</option>
                    <option value="Stable">Stable</option>
                    <option value="Recovering">Recovering</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Follow-up Date</label>
                  <input type="text" value={patientForm.followUp} onChange={(e) => setPatientForm({ ...patientForm, followUp: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} placeholder="Tomorrow 9 AM" />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Additional Notes</label>
                  <textarea value={patientForm.notes} onChange={(e) => setPatientForm({ ...patientForm, notes: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} rows="3" placeholder="Any additional observations..." />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <Save className="w-4 h-4 mr-2" />
                  Update Patient
                </button>
              </form>
            )}

            {/* Patient View Details */}
            {activeModal === 'view' && selectedPatient && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Full Name</p>
                    <p className={`${themeClasses.text}`}>{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Age</p>
                    <p className={`${themeClasses.text}`}>{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Gender</p>
                    <p className={`${themeClasses.text}`}>{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Contact</p>
                    <p className={`${themeClasses.text}`}>{selectedPatient.contact}</p>
                  </div>
                </div>

                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Village</p>
                  <p className={`${themeClasses.text}`}>{selectedPatient.village}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Temperature</p>
                    <p className={`${themeClasses.text} flex items-center`}><Thermometer className="w-4 h-4 mr-2" />{selectedPatient.temperature}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Blood Pressure</p>
                    <p className={`${themeClasses.text}`}>{selectedPatient.bloodPressure}</p>
                  </div>
                </div>

                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Water Source</p>
                  <p className={`${themeClasses.text}`}>{selectedPatient.waterSource}</p>
                </div>

                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Follow-up</p>
                  <p className={`${themeClasses.text}`}>{selectedPatient.followUp}</p>
                </div>
              </div>
            )}

            {/* Water Test Form */}
            {activeModal === 'waterTest' && (
              <form onSubmit={(e) => { e.preventDefault(); updateWaterTest(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>pH Level</label>
                    <input type="number" step="0.1" value={waterTestForm.pH} onChange={(e) => setWaterTestForm({ ...waterTestForm, pH: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} placeholder="7.0" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Turbidity (NTU)</label>
                    <input type="text" value={waterTestForm.turbidity} onChange={(e) => setWaterTestForm({ ...waterTestForm, turbidity: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} placeholder="5 NTU" />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Chlorine Level</label>
                  <select value={waterTestForm.chlorine} onChange={(e) => setWaterTestForm({ ...waterTestForm, chlorine: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`}>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Bacteria Level</label>
                  <select value={waterTestForm.bacteria} onChange={(e) => setWaterTestForm({ ...waterTestForm, bacteria: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Tester Name</label>
                  <input type="text" value={waterTestForm.testerName} onChange={(e) => setWaterTestForm({ ...waterTestForm, testerName: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} placeholder="Enter tester name" />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Test Notes</label>
                  <textarea value={waterTestForm.notes} onChange={(e) => setWaterTestForm({ ...waterTestForm, notes: e.target.value })} className={`w-full p-3 border rounded-lg ${themeClasses.border} ${themeClasses.bg} ${themeClasses.text}`} rows="3" placeholder="Any observations about the water quality..." />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <Save className="w-4 h-4 mr-2" />
                  Update Water Test
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}