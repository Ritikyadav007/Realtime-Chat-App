/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function sentenceCase(str: string) {
  let arr = str.toLowerCase().split(' ');
  arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
  return arr.join(' ');
}
