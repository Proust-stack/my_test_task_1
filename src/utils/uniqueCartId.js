export function uniqueCartId(id, obj) {
  let uniqueId = id + '_';
  for (let prop of Object.entries(obj)) {
    uniqueId += prop.reduce((prev, next) => prev + next, '');
  }

  return uniqueId;
}
