import React from 'react';
import { Bell } from 'lucide-react';
import { daysLeft } from '../utils/helpers';

const DeadlineAlerts = ({ applications }) => {
  const critical = [];

  applications.forEach(app => {
    const checks = [
      {
        label: 'Application Deadline',
        date: app.applicationDeadline,
        active: !app.applicationFilled
      },
      {
        label: 'PI Registration Deadline',
        date: app.piRegistrationDeadline,
        active: !app.piRegistration
      },
      {
        label: 'Fee Payment Deadline',
        date: app.feeDeadline,
        active: app.finalShortlisted && !app.feePaid
      }
    ];

    checks.forEach(c => {
      if (
        c.date &&
        c.active &&
        daysLeft(c.date) <= 7 &&
        daysLeft(c.date) >= 0
      ) {
        critical.push({
          institute: app.instituteName,
          type: c.label,
          date: c.date,
          days: daysLeft(c.date)
        });
      }
    });
  });

  if (!critical.length) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
      <div className="flex gap-3 items-start">
        <Bell className="text-red-500 mt-1" />

        <div>
          <h3 className="font-semibold text-red-900 mb-1">
            Urgent Deadlines (≤ 7 days)
          </h3>

          {critical.map((c, i) => (
            <div key={i} className="text-sm text-red-800">
              <b>{c.institute}</b> — {c.type}: {c.date}
              <span className="ml-2 text-red-600">
                ({c.days} days left)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeadlineAlerts;
