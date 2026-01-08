import React, { useEffect, useState } from 'react';

import Dashboard from './Dashboard';
import DeadlineAlerts from './DeadlineAlerts';
import ApplicationsTable from './ApplicationsTable';
import ApplicationForm from './ApplicationForm';

import { exportCSV, exportHistoryCSV, importCSV } from '../utils/csv';
import { logHistory } from '../utils/history';
import { undoLastChange } from '../utils/undo';

const STORAGE_KEY = 'mba-applications';

/* ===================== INITIAL FORM ===================== */
const initialFormState = {
  instituteName: '',
  instituteType: 'IIM',

  applicationDeadline: '',
  applicationFilled: false,

  shortlisted: false,
  shortlistDate: '',

  piRegistrationDeadline: '',
  piDate: '',
  piVenue: '',

  result: '', // Pending | Selected | Waitlisted | Rejected
  finalShortlisted: false,

  feeDeadline: '',
  feePaid: false,

  notes: '',
  history: []
};

export default function MBATracker() {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /* ===================== LOAD / SAVE ===================== */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setApplications(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  /* ===================== SAVE / UPDATE ===================== */
  const saveApplication = () => {
    if (!formData.instituteName) {
      alert('Institute is required');
      return;
    }

    /* ---------- NORMALIZE BUSINESS RULES ---------- */
    const normalizedForm = {
      ...formData,
      finalShortlisted: formData.result === 'Selected',
      feePaid:
        formData.result === 'Selected'
          ? formData.feePaid
          : false
    };

    if (editingId) {
      setApplications(prev =>
        prev.map(app => {
          if (app.id !== editingId) return app;

          const historyUpdates = logHistory(app, normalizedForm);

          return {
            ...normalizedForm,
            id: editingId,
            history: [...(app.history || []), ...historyUpdates]
          };
        })
      );
    } else {
      setApplications(prev => [
        ...prev,
        {
          ...normalizedForm,
          id: Date.now(),
          history: [
            {
              field: 'application',
              from: 'none',
              to: 'added',
              date: new Date().toLocaleString()
            }
          ]
        }
      ]);
    }

    setFormData(initialFormState);
    setEditingId(null);
    setShowForm(false);
  };

  /* ===================== ACTIONS ===================== */
  const handleEdit = (app) => {
    setFormData(app);
    setEditingId(app.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this application?')) return;
    setApplications(applications.filter(a => a.id !== id));
  };

  const handleUndo = (id) => {
    setApplications(prev =>
      prev.map(app => app.id === id ? undoLastChange(app) : app)
    );
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-indigo-900">
            MBA Application Tracker
          </h1>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportCSV(applications)}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              Export CSV
            </button>

            <button
              onClick={() => exportHistoryCSV(applications)}
              className="bg-amber-500 text-white px-4 py-2 rounded text-sm"
            >
              Export History
            </button>

            <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer text-sm">
              Import CSV
              <input
                type="file"
                hidden
                onChange={e =>
                  importCSV(e.target.files[0], setApplications)
                }
              />
            </label>

            <button
              onClick={() => {
                setFormData(initialFormState);
                setEditingId(null);
                setShowForm(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add Application
            </button>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
        <Dashboard applications={applications} />

        {/* ================= ALERTS ================= */}
        <DeadlineAlerts applications={applications} />

        {/* ================= TABLE ================= */}
        <ApplicationsTable
          applications={applications}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUndo={handleUndo}
        />

        {/* ================= FORM ================= */}
        {showForm && (
          <ApplicationForm
            formData={formData}
            setFormData={setFormData}
            onSave={saveApplication}
            onCancel={() => setShowForm(false)}
          />
        )}

      </div>
    </div>
  );
}






// import React, { useEffect, useState } from 'react';
// import Dashboard from './Dashboard';
// import DeadlineAlerts from './DeadlineAlerts';
// import ApplicationsTable from './ApplicationsTable';
// import ApplicationForm from './ApplicationForm';

// import { exportCSV, exportHistoryCSV, importCSV } from '../utils/csv';
// import { logHistory } from '../utils/history';
// import { undoLastChange } from '../utils/undo';
// // import { generateTestApplications } from '../utils/testData';
// const STORAGE_KEY = 'mba-applications';

// const initialFormState = {
//   instituteName: '',
//   instituteType: 'IIM',

//   applicationDeadline: '',
//   applicationFilled: false,

//   shortlisted: false,
//   shortlistDate: '',

//   piRegistrationDeadline: '',
//   piDate: '',

//   result: '',
//   finalShortlisted: false,

//   feeDeadline: '',
//   feePaid: false,

//   notes: '',
//   history: []
// };

// export default function MBATracker() {
//   const [applications, setApplications] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   /* ---------------- LOAD / SAVE ---------------- */
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) setApplications(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
//   }, [applications]);

//   /* ---------------- SAVE / UPDATE ---------------- */
//   const saveApplication = () => {
//     if (!formData.instituteName) {
//       alert('Institute is required');
//       return;
//     }

//     if (editingId) {
//       setApplications(prev =>
//         prev.map(app => {
//           if (app.id !== editingId) return app;

//           const historyUpdates = logHistory(app, formData);

//           return {
//             ...formData,
//             id: editingId,
//             history: [...(app.history || []), ...historyUpdates]
//           };
//         })
//       );
//     } else {
//       setApplications(prev => [
//         ...prev,
//         {
//           ...formData,
//           id: Date.now(),
//           history: [
//             {
//               date: new Date().toISOString(),
//               type: 'status',
//               message: 'Application added'
//             }
//           ]
//         }
//       ]);
//     }

//     setFormData(initialFormState);
//     setEditingId(null);
//     setShowForm(false);
//   };

//   /* ---------------- ACTIONS ---------------- */
//   const handleEdit = (app) => {
//     setFormData(app);
//     setEditingId(app.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     setApplications(applications.filter(a => a.id !== id));
//   };

//   const handleUndo = (id) => {
//     setApplications(prev =>
//       prev.map(app => app.id === id ? undoLastChange(app) : app)
//     );
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen bg-indigo-50 p-4">
//       <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         {/* Title */}
//         <h1 className="text-2xl font-bold text-indigo-900">
//             MBA Application Tracker
//         </h1>

//         {/* ACTION BUTTONS */}
//         <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end">
//             <button
//             onClick={() => exportCSV(applications)}
//             className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
//             >
//             ⬇ Export CSV
//             </button>

//             <button>

//             <label className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg cursor-pointer text-sm">
//             Import CSV
//             <input
//                 type="file"
//                 hidden
//                 onChange={e => importCSV(e.target.files[0], setApplications)}
//             />
//             </label>
//             </button>
//             <button
//             onClick={() => setShowForm(true)}
//             className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
//             >
//             ＋ Add Application
//             </button>
//         </div>
//         </div>


//         <Dashboard applications={applications} />
//         <DeadlineAlerts applications={applications} />

//         <ApplicationsTable
//           applications={applications}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onUndo={handleUndo}
//         />

//         {showForm && (
//           <ApplicationForm
//             formData={formData}
//             setFormData={setFormData}
//             onSave={saveApplication}
//             onCancel={() => setShowForm(false)}
//           />
//         )}

//       </div>
//     </div>
//   );
// }



