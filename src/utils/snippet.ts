export const get = (key: string) => (obj: object) => obj[key];

export const numberPad = (n: number) =>
  n.toString().length === 1 ? `0${n}` : n.toString();

export const convertSecondsToMinute = (s: number) => {
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${numberPad(min)}:${numberPad(sec)}`;
};
