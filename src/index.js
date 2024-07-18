import { node, linkedList } from "./lists.js";

function HashMap(size) {
  let myMap = new Array(size);
  let origSize = size;
  let loadFactor = 0.75;

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }
    console.log(`${key} is ${hashCode}`);
    return hashCode;
  };

  const expand = () => {
    let addOn = new Array(origSize);
    myMap.push(...addOn);
    size += origSize;
  };

  //works
  const set = (key, data) => {
    let index = hash(key);
    console.log(`index is ${index}`);
    console.log(`key is ${key}`);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (size * loadFactor < length()) expand();

    if (myMap[index] == undefined || myMap[index].key == key) {
      myMap[index] = { key, data };
    } else if (myMap[index] != undefined) {
      console.log("RUH ROH theres a collision");
      console.log(myMap[index]);

      let dataInBucket = myMap[index];

      if (dataInBucket.headNode == undefined) {
        //need to convert to linked list
        let newList = linkedList(dataInBucket);
        newList.append({ key, data });
        myMap[index] = newList;
      } else {
        //it's already a linked list
        myMap[index].append({ key, data });
      }
    }
  };

  //works
  const get = (key) => {
    let index = hash(key);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (myMap[index].key == key) {
      return myMap[index].data;
    } else if (myMap[index].headNode != undefined) {
      let i = find(key, myMap[index].headNode);
      return myMap[index].at(i).value.data;
    } else return null;
  };

  const has = (key) => {
    let index = hash(key);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    if (myMap[index] == undefined) return false;
    else if (myMap[index].key == key) return true;
    else if (myMap[index].headNode != undefined) {
      if (find(key, myMap[index].headNode) != null) return true;
      else return false;
    } else return false;
  };

  //works, but what if we remove the last one in LL???
  const remove = (key) => {
    let index = hash(key);
    if (index < 0 || index >= size) {
      throw new Error("Trying to access index out of bound");
    }
    console.log("before:");
    myMap[index].toString();
    if (myMap[index].key == key && myMap[index].headNode == undefined) {
      //if not a linked list, just make it undefined
      console.log("if not a linked list, just make it undefined");
      myMap[index] = undefined;
      return true;
    } else if (
      myMap[index].headNode.value.key == key &&
      myMap[index].headNode.next != undefined
    ) {
      //if it is a linked list and it's the first node
      console.log(`it's the first node`);
      myMap[index].headNode.value = myMap[index].headNode.next.value;
      myMap[index].headNode.next = myMap[index].headNode.next.next;
      console.log("after:");
      myMap[index].toString();
    } else if (myMap[index].headNode != undefined) {
      //if a linked list but NOT the first node

      console.log("if a linked list");
      console.log("before:");
      myMap[index].toString();
      let myList = myMap[index];
      let finder = myList.headNode;
      let i = find(key, myList.headNode);
      console.log(`i is ${i}`);
      let size = myList.size();

      //make the headnode, assuming its not what we're removing
      let newList = linkedList(myList.headNode.value);

      for (let k = 1; k < size; k++) {
        if (k != i) {
          newList.append(finder.next.value);
        }
        finder = finder.next;
      }
      console.log("after:");
      newList.toString();
      myMap[index] = newList;
      return true;
    } else return false;
  };

  const find = (value, headNode) => {
    let findValue = headNode;
    let i = 0;
    while (findValue.next !== null) {
      console.log(`findvalue.value is ${findValue.value.key}`);
      if (findValue.value.key == value) return i;
      findValue = findValue.next;
      i++;
    }
    if (findValue.value.key == value) return i;
    return null;
  };

  const length = () => {
    let count = 0;
    for (let i = 0; i < size; i++) {
      if (myMap[i] == undefined) {
        //donothing
      } else if (myMap[i].hasOwnProperty("headNode")) {
        count += myMap[i].size();
      } else count++;
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
    for (let i = 0; i < size; i++) {
      console.log(`myMap${i} is ${myMap[i]}`);
      let bucket = myMap[i];
      if (bucket == undefined) {
        /*do nothing */
      } else if (bucket.hasOwnProperty("headNode")) {
        console.log("its a linked list");
        for (let j = 0; j < bucket.size(); j++) {
          allKeys[k] = bucket.at(j).value.key;
          k++;
        }
      } else {
        allKeys[k] = bucket.key;
        k++;
      }
    }
    console.log(allKeys);
    return allKeys;
  };

  const values = () => {
    let allValues = [];
    let k = 0;
    for (let i = 0; i < size; i++) {
      if (myMap[i] == undefined) {
        //do nothing
      } else if (myMap[i].hasOwnProperty("headNode")) {
        for (let j = 0; j < myMap[i].size(); j++) {
          allValues[k] = myMap[i].at(j).value.data;
          k++;
        }
      } else if (myMap[i].key != undefined) {
        allValues[k] = myMap[i].data;
        k++;
      }
    }
    console.log(allValues);
    return allValues;
  };

  const entries = () => {
    let allEntries = [];
    let k = 0;
    for (let i = 0; i < size; i++) {
      if (myMap[i] == undefined) {
        //do nothing
      } else if (myMap[i].hasOwnProperty("headNode")) {
        for (let j = 0; j < myMap[i].size(); j++) {
          allEntries[k] = [myMap[i].at(j).value.key, myMap[i].at(j).value.data];
          k++;
        }
      } else if (myMap[i].key != undefined) {
        allEntries[k] = [myMap[i].key, myMap[i].data];
        k++;
      }
    }
    console.log(allEntries);
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

let test = HashMap(16);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("god", "is good");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test);
console.log(test.length());
// console.log(test.get("frog"));
// console.log(test.get("god"));
// test.remove("lion");
// console.log(test);
// console.log(`has ice cream? ${test.has("ice cream")}`);
test.keys();
console.log(test.length());
test.values();
console.log(test.myMap);
test.entries();
