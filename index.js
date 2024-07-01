function HashMap(size) {
  let myMap = new Array(size);

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 37;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
      // console.log(hashCode);
    }
    return hashCode;
  };

  const set = (key, value) => {
    let index = hash(key);
    console.log(`index is ${index}`);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (myMap[index] == undefined || myMap[index].key == key) {
      myMap[index] = { key, value };
    } else console.log("RUH ROH theres a collision");
  };

  const get = (key) => {
    let index = hash(key);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (myMap[index] != undefined) return myMap[index].value;
    else return null;
  };

  const has = (key) => {
    let index = hash(key);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (myMap[index] != undefined && myMap[index].key == key) return true;
    else return false;
  };

  const remove = (key) => {
    let index = hash(key);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (myMap[index] != undefined && myMap[index].key == key) {
      myMap[index] = undefined;
      return true;
    } else return false;
  };

  const length = () => {
    let count = 0;
    for (i = 0; i < size; i++) {
      if (myMap[i] != undefined) {
        count++;
      }
    }
    return count;
  };

  const clear = () => {
    for (i = 0; i < size; i++) {
      myMap[i] = undefined;
    }
  };

  const keys = () => {
    let allKeys = [];
    let k = 0;
    for (i = 0; i < size; i++) {
      if (myMap[i] != undefined) {
        allKeys[k] = myMap[i].key;
        k++;
      }
    }
    return allKeys;
  };

  const values = () => {
    let allValues = [];
    let k = 0;
    for (i = 0; i < size; i++) {
      if (myMap[i] != undefined) {
        allValues[k] = myMap[i].value;
        k++;
      }
    }
    return allValues;
  };

  const entries = () => {
    let allEntries = [];
    let k = 0;
    for (i = 0; i < size; i++) {
      if (myMap[i] != undefined) {
        allEntries[k] = [myMap[i].key, myMap[i].value];
        k++;
      }
    }
    return allEntries;
  };

  return {
    myMap,
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}
