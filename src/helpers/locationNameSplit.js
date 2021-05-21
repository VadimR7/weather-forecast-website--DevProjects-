export default function locationNameSplit(string) {
  if (string) {
    const stringArr = string.split(',');
    let newStringArr = [];
    newStringArr.push(stringArr[0], stringArr[stringArr.length - 1])
    newStringArr = newStringArr.join(',')
    return newStringArr;
  } 
  return null;
}
