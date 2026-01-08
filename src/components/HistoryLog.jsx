import React from 'react';

export default function HistoryLog({ history = [] }) {
  if (!history.length) return null;

  return (
    <div className="mt-4 bg-gray-50 p-3 rounded border">
      <h4 className="font-semibold mb-2 text-sm text-gray-800">
        Change History
      </h4>

      <div className="space-y-1">
        {history.map((h, i) => (
          <div
            key={`${h.date}-${i}`}
            className="text-xs text-gray-600 flex flex-wrap gap-1"
          >
            <span className="text-gray-500">{h.date}</span>
            <span>—</span>

            {h.field ? (
              <>
                <span className="font-medium text-gray-700">
                  {humanize(h.field)}
                </span>
                <span>:</span>
                <span className="line-through text-red-500">
                  {formatValue(h.from)}
                </span>
                <span>→</span>
                <span className="text-green-600 font-medium">
                  {formatValue(h.to)}
                </span>
              </>
            ) : (
              // Backward compatibility if old history exists
              <span>{h.message}</span>
            )}
          </div>
        ))}
      </div>
    </div>
    
  );
}

/* ---------------- Helpers ---------------- */

const humanize = (field) =>
  field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase());

const formatValue = (val) => {
  if (val === true) return 'Yes';
  if (val === false) return 'No';
  if (val === '' || val == null) return '—';
  return String(val);
};
