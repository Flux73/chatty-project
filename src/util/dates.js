const createArrayDate = (start, finish) => {
  const arr = [];

  for (let i = start; i <= finish; i++) {
    arr.push(i);
  }

  return arr;
};

export const days = createArrayDate(1, 31);

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dev",
];

export const years = createArrayDate(1922, 2012).reverse();
