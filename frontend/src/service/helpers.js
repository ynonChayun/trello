export const applyDrag = (arr, dragResult) => {
  console.log('arr: ' , arr)
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  console.log('itemToAdd: ' , itemToAdd)
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  console.log('result: ' , result)
  return result;
}