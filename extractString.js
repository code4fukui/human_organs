export const extractStrings = (s, start, end) => {
  let i = 0;
  const res = [];
  for (;;) {
    const n = s.indexOf(start, i);
    if (n < 0) break;
    const m = s.indexOf(end, n + start.length);
    if (m < 0) break;
    const fn0 = s.substring(n + start.length, m);
    console.log(fn0);
    const fn = JSON.parse(`"${fn0}"`);
    res.push(fn);
    i = m + end.length;
  }
  return res;
};
export const extractString = (s, start, end) => {
  const res = extractStrings(s, start, end);
  if (res.length > 0) return res[0];
  return null;
};
