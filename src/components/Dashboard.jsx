import React from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Hourglass,
  BadgeCheck
} from 'lucide-react';

const Dashboard = ({ applications }) => {
  const total = applications.length;

  const applied = applications.filter(a => a.applicationFilled).length;
  const shortlisted = applications.filter(a => a.shortlisted).length;
  const waitlisted = applications.filter(a => a.result === 'Waitlisted').length;
  const offers = applications.filter(
  a => a.result === 'Selected' || a.finalShortlisted
).length;
  const completed = applications.filter(a => a.feePaid).length;
  const rejected = applications.filter(a => a.result === 'Rejected').length;

  const completionRate = total
    ? Math.round((completed / total) * 100)
    : 0;

  const stats = [
    {
      label: 'Total Applications',
      value: total,
      icon: <FileText className="text-indigo-600" size={20} />
    },
    {
      label: 'Applied',
      value: applied,
      icon: <Clock className="text-blue-600" size={20} />
    },
    {
      label: 'Shortlisted',
      value: shortlisted,
      icon: <CheckCircle className="text-green-600" size={20} />
    },
    {
      label: 'Waitlisted',
      value: waitlisted,
      icon: <Hourglass className="text-amber-600" size={20} />
    },
    {
      label: 'Offers',
      value: offers,
      icon: <BadgeCheck className="text-emerald-600" size={20} />
    },
    {
      label: 'Rejected',
      value: rejected,
      icon: <XCircle className="text-red-600" size={20} />
    }
  ];

  return (
    <div className="mb-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 bg-white shadow-sm flex items-center gap-3"
          >
            {s.icon}
            <div>
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className="text-xl font-semibold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* OVERALL PROGRESS */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">
            Overall Completion
          </span>
          <span className="font-semibold text-indigo-600">
            {completionRate}%
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="h-2 rounded bg-indigo-600 transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
