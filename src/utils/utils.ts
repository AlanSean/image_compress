export const delay = async function name(time: number): Promise<boolean> {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(true);
    }, time);
  });
};
