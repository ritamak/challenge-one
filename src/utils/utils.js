export const objToArray = (obj) => {
  let newArr = [];
  for (const key in obj) {
    const arrayObj = {
      id: key,
      ...obj[key],
    };

    newArr.unshift(arrayObj);
  }
  return newArr;
};
