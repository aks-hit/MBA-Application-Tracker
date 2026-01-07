export const undoLastChange = (app) => {
  if (!app.history?.length) return app;
  const history = [...app.history];
  history.pop();
  return { ...app, history };
};

