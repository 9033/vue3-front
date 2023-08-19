// s <= e && 0 < step
const range = (s: number, e: number, step: number = 1): number[] => {
  if (step === 0) throw Error("step not be zero");
  if (step < 0) return [];
  const r = [];
  for (let i = s; s <= i && i < e; i += step) {
    r.push(i);
  }
  return r;
};

export default range;
