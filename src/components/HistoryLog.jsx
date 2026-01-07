import React from 'react';
export default function HistoryLog({ history = []}) {
  if (!history.length) return null;

  return (
    <div className="mt-4 bg-gray-50 p-3 rounded">
      <h4 className="font-semibold mb-2">History</h4>
      {history.map((h, i) => (
        <div key={i} className="text-xs text-gray-600">
          {h.date} — {h.message}
        </div>
      ))}
    </div>
  );
}

