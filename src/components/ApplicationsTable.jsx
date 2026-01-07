import { CheckCircle, Clock, Trash2 } from 'lucide-react';
import HistoryLog from './HistoryLog';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

export default function ApplicationsTable({ applications, onEdit, onDelete, onUndo }) {
  const [openHistory, setOpenHistory] = useState(null);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-2 text-left">Institute</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(app => (
            <>
              <tr key={app.id} className="border-b">
                <td className="p-2 font-medium">
                  {app.instituteName}
                  <ProgressBar app={app}/>
                </td>

                <td className="text-center">
                  {app.applicationFilled
                    ? <CheckCircle className="text-green-600" size={16}/>
                    : <Clock size={16}/>
                  }
                </td>

                <td className="text-center">{app.applicationDeadline || '-'}</td>
                <td className="text-center">{app.result || '-'}</td>

                <td className="text-center">
                  <button onClick={() => onEdit(app)} className="text-blue-600 text-xs">Edit</button>
                  <button onClick={() => onUndo(app.id)} className="text-gray-600 text-xs ml-2">Undo</button>
                  <button onClick={() => onDelete(app.id)} className="ml-2 text-red-600">
                    <Trash2 size={14}/>
                  </button>
                  <button
                    onClick={() => setOpenHistory(openHistory === app.id ? null : app.id)}
                    className="ml-2 text-xs text-indigo-600"
                  >
                    History
                  </button>
                </td>
              </tr>

              {openHistory === app.id && (
                <tr>
                  <td colSpan="5">
                    <HistoryLog history={app.history}/>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}



// import { CheckCircle, Clock, Trash2 } from 'lucide-react';

// const ApplicationsTable = ({ applications, onEdit, onDelete }) => {
//   return (
//     <div className="overflow-x-auto">

//       {/* ================= DESKTOP TABLE ================= */}
//       <table className="w-full text-sm border-collapse hidden md:table">
//         <thead className="bg-indigo-600 text-white">
//           <tr>
//             <th className="p-3 text-left">Institute</th>
//             <th className="p-3 text-center">Type</th>
//             <th className="p-3 text-center">Application</th>
//             <th className="p-3 text-center">Shortlist</th>
//             <th className="p-3 text-center">PI</th>
//             <th className="p-3 text-center">Result</th>
//             <th className="p-3 text-center">Fee</th>
//             <th className="p-3 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {applications.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="p-6 text-center text-gray-500">
//                 No applications added yet
//               </td>
//             </tr>
//           ) : (
//             applications.map(app => (
//               <tr key={app.id} className="border-b hover:bg-gray-50">

//                 <td className="p-3 font-medium text-left">
//                   {app.instituteName}
//                 </td>

//                 <td className="p-3 text-center">
//                   {app.instituteType}
//                 </td>

//                 <td className="p-3 text-center">
//                   <div className="text-xs text-gray-600">Deadline</div>
//                   {app.applicationDeadline || '-'}
//                   <div className="mt-1">
//                     {app.applicationFilled
//                       ? <CheckCircle className="inline text-green-600" size={16} />
//                       : <Clock className="inline text-gray-400" size={16} />}
//                   </div>
//                 </td>

//                 <td className="p-3 text-center">
//                   {app.shortlisted
//                     ? <CheckCircle className="inline text-green-600" size={16} />
//                     : '-'}
//                 </td>

//                 <td className="p-3 text-center">
//                   <div className="text-xs text-gray-600">Reg Deadline</div>
//                   {app.piRegistrationDeadline || '-'}
//                 </td>

//                 <td className="p-3 text-center">
//                   {app.result || '-'}
//                 </td>

//                 <td className="p-3 text-center">
//                   <div className="text-xs text-gray-600">Fee Deadline</div>
//                   {app.feeDeadline || '-'}
//                 </td>

//                 <td className="p-3 text-center">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       onClick={() => onEdit(app)}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => onDelete(app.id)}
//                       className="text-red-600"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </td>

//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* ================= MOBILE CARDS ================= */}
//       <div className="md:hidden space-y-4">
//         {applications.map(app => (
//           <div
//             key={app.id}
//             className="border rounded-lg p-4 shadow-sm bg-white"
//           >
//             <div className="font-semibold text-indigo-900">
//               {app.instituteName}
//             </div>
//             <div className="text-xs text-gray-500 mb-2">
//               {app.instituteType}
//             </div>

//             <div className="space-y-1 text-sm">
//               <div>📄 <b>Application:</b> {app.applicationDeadline || '-'}</div>
//               <div>🧾 <b>Shortlisted:</b> {app.shortlisted ? 'Yes' : 'No'}</div>
//               <div>🎤 <b>PI Reg:</b> {app.piRegistrationDeadline || '-'}</div>
//               <div>📢 <b>Result:</b> {app.result || '-'}</div>
//               <div>💰 <b>Fee:</b> {app.feeDeadline || '-'}</div>
//             </div>

//             <div className="flex gap-3 mt-3">
//               <button
//                 onClick={() => onEdit(app)}
//                 className="text-blue-600 text-sm"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => onDelete(app.id)}
//                 className="text-red-600 text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ApplicationsTable;
