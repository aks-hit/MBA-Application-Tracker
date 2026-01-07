/* ===================== DATE HELPERS ===================== */
export const daysLeft = (date) => {
  if (!date) return Infinity;

  const today = new Date();
  const target = new Date(date);

  return Math.ceil(
    (target - today) / (1000 * 60 * 60 * 24)
  );
};

/* ===================== APPLICATION STAGE ===================== */
export const getStage = (app) => {
  if (app.feePaid) return 'Completed';
  if (app.finalShortlisted) return 'Offer Received';

  if (app.result === 'Waitlisted') return 'Waitlisted';
  if (app.result === 'Selected') return 'Selected';
  if (app.result === 'Rejected') return 'Rejected';

  if (app.piRegistration) return 'PI Registered';
  if (app.shortlisted) return 'Shortlisted';
  if (app.applicationFilled) return 'Applied';

  return 'Form Open';
};

export const addHistory = (app, message) => ({
  ...app,
  history: [
    ...(app.history || []),
    { message, date: new Date().toISOString().slice(0,10) }
  ]
});
