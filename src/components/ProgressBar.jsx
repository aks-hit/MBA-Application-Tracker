const STEPS = [
  'Form Open',
  'Applied',
  'Shortlisted',
  'PI',
  'Result',
  'Fee',
  'Completed'
];

export default function ProgressBar({ app }) {
  const getStepIndex = () => {
    if (app.feePaid) return 6;
    if (app.finalShortlisted) return 5;
    if (app.result) return 4;
    if (app.piRegistration || app.piDate) return 3;
    if (app.shortlisted) return 2;
    if (app.applicationFilled) return 1;
    return 0;
  };

  const activeStep = getStepIndex();

  /* ---------- STATUS MODE ---------- */
  const isRejected = app.result === 'Rejected';
  const isWaitlisted = app.result === 'Waitlisted';
  const isCompleted = app.feePaid;

  const getColor = (i) => {
    if (i > activeStep) return 'bg-gray-200';

    if (isRejected) return 'bg-red-500';
    if (isWaitlisted) return 'bg-amber-400';
    if (isCompleted) return 'bg-green-600';

    return 'bg-indigo-600';
  };

  const getLabelColor = (i) => {
    if (i !== activeStep) return 'text-gray-500';

    if (isRejected) return 'text-red-600 font-semibold';
    if (isWaitlisted) return 'text-amber-600 font-semibold';
    if (isCompleted) return 'text-green-700 font-semibold';

    return 'text-indigo-700 font-semibold';
  };

  return (
    <div className="mt-3">
      {/* Labels */}
      <div className="flex justify-between text-[11px] mb-1">
        {STEPS.map((label, i) => (
          <span key={i} className={getLabelColor(i)}>
            {label}
          </span>
        ))}
      </div>

      {/* Progress bars */}
      <div className="flex gap-1">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded transition-all ${getColor(i)}`}
          />
        ))}
      </div>

      {/* Status hint */}
      {isRejected && (
        <div className="text-xs text-red-600 mt-1">
          Application rejected — progress stopped
        </div>
      )}

      {isWaitlisted && (
        <div className="text-xs text-amber-600 mt-1">
          Waitlisted — monitoring further movement
        </div>
      )}

      {isCompleted && (
        <div className="text-xs text-green-700 mt-1">
          Admission confirmed 🎉
        </div>
      )}
    </div>
  );
}
