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

export const isNotEmpty = (value) => value.trim() !== "";
export const isPhone = (value) => value.match(phoneRgx);
export const isUsername = (value) => value.match(usernameRgx);
//const reg = new RegExp("^[0-9]+$");
let phoneRgx = /^\d{9}$/;
const usernameRgx = /[\w-_]+/;
