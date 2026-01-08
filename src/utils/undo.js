export const undoLastChange = (app) => {
  if (!app.history || app.history.length === 0) return app;

  const history = [...app.history];
  const last = history.pop(); // last change

  // Restore the previous value
  const revertedApp = {
    ...app,
    [last.field]: last.from,
    history
  };

  return revertedApp;
};
