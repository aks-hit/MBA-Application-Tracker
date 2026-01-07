export const exportCSV = (apps) => {
  if (!apps.length) return alert('No data');
  const headers = Object.keys(apps[0]).filter(k => k !== 'id' && k !== 'history');
  const rows = apps.map(a => headers.map(h => `"${a[h] ?? ''}"`));
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  download(csv, 'mba_tracker.csv');
};

export const exportHistoryCSV = (apps) => {
  const rows = [];
  apps.forEach(a =>
    a.history?.forEach(h =>
      rows.push([a.instituteName, h.type, h.message, h.date])
    )
  );
  const csv = [['Institute','Type','Message','Date'], ...rows]
    .map(r => r.join(',')).join('\n');
  download(csv, 'mba_history.csv');
};

const download = (csv, name) => {
  const blob = new Blob([csv], { type:'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

/* ===================== CSV IMPORT ===================== */
export const importCSV = (file, setApplications) => {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const text = reader.result;
    if (!text) return;

    const [headerLine, ...lines] = text.split('\n');
    const headers = headerLine.split(',').map(h => h.replace(/"/g, '').trim());

    const parsed = lines
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',').map(v => v.replace(/"/g, '').trim());
        const obj = {};

        headers.forEach((h, i) => {
          const val = values[i];

          // Boolean coercion
          if (val === 'true' || val === 'false') {
            obj[h] = val === 'true';
          } else {
            obj[h] = val;
          }
        });

        return {
          ...obj,
          id: Date.now() + Math.random()
        };
      });

    setApplications(prev => [...prev, ...parsed]);
  };

  reader.readAsText(file);
};
