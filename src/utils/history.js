export const logHistory = (prev, next) => {
  const logs = [];

  Object.keys(next).forEach(key => {
    if (key === 'history' || key === 'id') return;
    if (prev[key] !== next[key]) {
      logs.push({
        date: new Date().toISOString(),
        type: key.includes('Deadline') ? 'deadline' : 'edit',
        message: `${key} changed from "${prev[key] || '-'}" → "${next[key] || '-'}"`
      });
    }
  });

  return logs;
};
