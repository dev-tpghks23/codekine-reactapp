export const formatBirth = (val) => {
  const d = val.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 4) return d;
  if (d.length <= 6) return `${d.slice(0, 4)}-${d.slice(4)}`;
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`;
};

export const formatPhone = (val) => {
  const d = val.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

export const formatExamNo = (val) => {
  const d = val.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 4) return d;
  if (d.length <= 6) return `${d.slice(0, 4)}-${d.slice(4)}`;
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`;
};

// CL-YYYY-NNNNN
export const formatCertNo = (val) => {
  const c = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 11);
  if (c.length <= 2) return c;
  if (c.length <= 6) return `${c.slice(0, 2)}-${c.slice(2)}`;
  return `${c.slice(0, 2)}-${c.slice(2, 6)}-${c.slice(6)}`;
};

// SL-YYYY-NNNNNN
export const formatLicenseNo = (val) => {
  const c = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12);
  if (c.length <= 2) return c;
  if (c.length <= 6) return `${c.slice(0, 2)}-${c.slice(2)}`;
  return `${c.slice(0, 2)}-${c.slice(2, 6)}-${c.slice(6)}`;
};
