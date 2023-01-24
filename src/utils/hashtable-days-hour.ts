export function getDaysHoursHash() {
  let hashtable = {};
  for(let i = 7; i < 21; i++){
    hashtable[i] = true;
  }
  return hashtable;
}
