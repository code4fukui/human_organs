export const extracts = (s, start, end) => {
  let i = 0;
  const res = [];
  for (;;) {
    const n = s.indexOf(start, i);
    if (n < 0) break;
    const m = s.indexOf(end, n + start.length);
    if (m < 0) break;
    const fn0 = s.substring(n + start.length, m);
    res.push(fn0);
    i = m + end.length;
  }
  return res;
};
export const extractStrings = (s, start, end) => {
  return extracts(s, start, end).map(i => JSON.parse(`"${i}"`));
};
export const extractString = (s, start, end) => {
  const res = extractStrings(s, start, end);
  if (res.length > 0) return res[0];
  return null;
};
export const extractList = (s, start, end) => {
  const res = extracts(s, start, end);
  if (res.length == 0) return null;
  return JSON.parse(`[${res[0]}]`);
};
