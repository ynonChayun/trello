// export const applyDrag = (arr, dragResult) => {
//   arr = JSON.parse(JSON.stringify(arr))
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) return arr;
//   const result = [...arr];
//   // debugger
//   var payload1 =  JSON.parse(JSON.stringify(payload))
//   console.log('payload: ' , [...payload1[0].tasks])
//   let itemToAdd = [...payload1[0].tasks]
//   if (removedIndex !== null) {
//     itemToAdd = result.splice(removedIndex, 1)[0];
//   }
//   if (addedIndex !== null) {
//     result.splice(addedIndex, 0, itemToAdd);
//   }
//   console.log('[...result]: ' , [...result])
//   return [...result];
// }
export const applyDrag = (arr, dragResult) => {
  arr = JSON.parse(JSON.stringify(arr))
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  // debugger
  // var payload1 =  JSON.parse(JSON.stringify(payload))
  // console.log('payload: ' , payload1[0].tasks)
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  console.log('itemToAdd: ' , itemToAdd)
  // console.log('[...result]: ' , result[0])
  return [...result];
}