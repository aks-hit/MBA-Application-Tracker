/* ===================== CSV HEADERS ===================== */

const APP_HEADERS = [
  'instituteName',
  'instituteType',

  'applicationDeadline',
  'applicationFilled',

  'shortlisted',
  'piRegistrationDeadline',
  'piDate',
  'piVenue',

  'result',

  'feeDeadline',
  'feePaid',

  'notes'
];

/* ===================== CSV EXPORT ===================== */

export const exportCSV = (apps) => {
  if (!apps || !apps.length) {
    alert('No data to export');
    return;
  }

  const rows = apps.map(app =>
    APP_HEADERS.map(h =>
      `"${String(app[h] ?? '').replace(/"/g, '""')}"`
    )
  );

  const csv = [
    APP_HEADERS.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  download(csv, 'mba_tracker.csv');
};

/* ===================== HISTORY EXPORT ===================== */

export const exportHistoryCSV = (apps) => {
  const rows = [];

  apps.forEach(app => {
    (app.history || []).forEach(h => {
      rows.push([
        `"${app.instituteName}"`,
        `"${h.type || ''}"`,
        `"${h.message || ''}"`,
        `"${h.date || ''}"`
      ]);
    });
  });

  if (!rows.length) {
    alert('No history to export');
    return;
  }

  const csv = [
    'Institute,Type,Message,Date',
    ...rows.map(r => r.join(','))
  ].join('\n');

  download(csv, 'mba_history.csv');
};

/* ===================== CSV IMPORT ===================== */

export const importCSV = (file, setApplications) => {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const text = reader.result;
    if (!text) return;

    const [headerLine, ...lines] = text.split('\n');
    const headers = headerLine
      .split(',')
      .map(h => h.replace(/"/g, '').trim());

    const parsedApps = lines
      .filter(line => line.trim())
      .map(line => {
        const values = line
          .split(',')
          .map(v => v.replace(/"/g, '').trim());

        const obj = {};

        headers.forEach((h, i) => {
          let val = values[i] ?? '';

          // Boolean coercion
          if (val === 'true') val = true;
          else if (val === 'false') val = false;

          obj[h] = val;
        });

        return {
          ...obj,
          id: Date.now() + Math.random(),
          history: [] // always initialize
        };
      });

    setApplications(prev => [...prev, ...parsedApps]);
  };

  reader.readAsText(file);
};

/* ===================== DOWNLOAD HELPER ===================== */

const download = (csv, filename) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};
