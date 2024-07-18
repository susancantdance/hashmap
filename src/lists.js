function node(value = null, next = null) {
  return { value: value, next: next };
}

function linkedList(firstValue) {
  let headNode = node(firstValue);

  const append = (value) => {
    let findTail = headNode;
    while (findTail.next !== null) {
      findTail = findTail.next;
    }
    findTail.next = node(value);
  };

  const prepend = (value) => {
    let newHead = node(value);
    console.log(`new head ${newHead.value}`);
    let oldHead = node(headNode.value, headNode.next);
    console.log(`old head ${oldHead.value}`);
    newHead.next = oldHead;
    headNode.value = newHead.value;
    headNode.next = newHead.next;
    console.log(`headNode ${headNode.value}`);
  };

  const size = () => {
    if (headNode.next == null && headNode.value == null) return 0;
    let i = 1;
    let counter = headNode;
    while (counter.next !== null) {
      counter = counter.next;
      i++;
    }
    return i;
  };

  const head = () => {
    return headNode;
  };

  const tail = () => {
    let findTail = headNode;
    while (findTail.next !== null) {
      findTail = findTail.next;
    }
    return findTail;
  };

  const at = (index) => {
    let pointer = headNode;
    for (let i = 0; i < index; i++) {
      pointer = pointer.next;
    }
    return pointer;
  };

  const pop = () => {
    if (headNode.next == null) headNode.value = null;
    let findTail = headNode;
    let newTail = {};
    while (findTail.next !== null) {
      newTail = findTail;
      findTail = findTail.next;
    }
    newTail.next = null;
  };

  const contains = (value) => {
    let findValue = headNode;
    while (findValue.next !== null) {
      if (findValue.value == value) return true;
      findValue = findValue.next;
    }
    return findValue.value == value;
  };

  const find = (value) => {
    let findValue = headNode;
    let i = 0;
    while (findValue.next !== null) {
      if (findValue.value == value) return i;
      findValue = findValue.next;
      i++;
    }
    if (findValue.value == value) return i;
    return null;
  };

  const toString = () => {
    let toPrint = "";
    let findValue = headNode;
    while (findValue.next !== null) {
      toPrint = toPrint.concat(`( ${findValue.value.key} ) -> `);
      findValue = findValue.next;
    }

    console.log(toPrint.concat(`( ${findValue.value.key} ) -> null`));
  };

  return {
    headNode,
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
  };
}

export { node, linkedList };
