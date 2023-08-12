const range = (s: number, e: number, step: number = 1): number[] => {
  const r = [];
  for (let i = s; i < e; i += step) {
    r.push(i);
  }
  return r;
};

export default range;
