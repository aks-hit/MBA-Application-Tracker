export const logHistory = (oldApp, newApp) => {
  const changes = [];

  Object.keys(newApp).forEach(key => {
    if (key === 'history' || key === 'id') return;

    if (oldApp[key] !== newApp[key]) {
      changes.push({
        field: key,
        from: oldApp[key],
        to: newApp[key],
        date: new Date().toLocaleString()
      });
    }
  });

  return changes;
};
