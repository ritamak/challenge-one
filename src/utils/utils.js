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
export const hasPhone = (value) => value.match(hasPhoneRgx);

export const isUsername = (value) => value.match(usernameRgx);
//const reg = new RegExp("^[0-9]+$");
let phoneRgx = /^\d{9}$/;
const usernameRgx = /^[a-z0-9_-]{3,16}$/;
let hasPhoneRgx = /[+]?\d{9}|\(\d{3}\)\s?-\d{6}/gm;
