class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.firstNode = null;
    this.lastNode = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);

    if (this.lastNode === null) {
      this.firstNode = node;
    } else {
      this.lastNode.nextNode = node;
    }

    this.lastNode = node;
    this.length += 1;
  }

  prepend(value) {
    const node = new Node(value, this.firstNode);
    this.firstNode = node;

    if (this.lastNode === null) {
      this.lastNode = node;
    }

    this.length += 1;
  }

  size() {
    return this.length;
  }

  head() {
    return this.firstNode === null ? undefined : this.firstNode.value;
  }

  tail() {
    return this.lastNode === null ? undefined : this.lastNode.value;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.length) {
      return undefined;
    }

    let node = this.firstNode;
    for (let currentIndex = 0; currentIndex < index; currentIndex += 1) {
      node = node.nextNode;
    }

    return node.value;
  }

  pop() {
    if (this.firstNode === null) {
      return undefined;
    }

    const value = this.firstNode.value;
    this.firstNode = this.firstNode.nextNode;
    this.length -= 1;

    if (this.firstNode === null) {
      this.lastNode = null;
    }

    return value;
  }

  contains(value) {
    return this.findIndex(value) !== -1;
  }

  findIndex(value) {
    let node = this.firstNode;
    let index = 0;

    while (node !== null) {
      if (node.value === value) {
        return index;
      }

      node = node.nextNode;
      index += 1;
    }

    return -1;
  }

  toString() {
    let result = '';
    let node = this.firstNode;

    while (node !== null) {
      result += `( ${node.value} ) -> `;
      node = node.nextNode;
    }

    return result === '' ? '' : `${result}null`;
  }

  insertAt(index, ...values) {
    if (!Number.isInteger(index) || index < 0 || index > this.length) {
      throw new RangeError('Index is outside the bounds of the list.');
    }

    if (values.length === 0) {
      return;
    }

    if (index === 0) {
      for (let valueIndex = values.length - 1; valueIndex >= 0; valueIndex -= 1) {
        this.prepend(values[valueIndex]);
      }
      return;
    }

    let previousNode = this.firstNode;
    for (let currentIndex = 1; currentIndex < index; currentIndex += 1) {
      previousNode = previousNode.nextNode;
    }

    const nextNode = previousNode.nextNode;
    for (const value of values) {
      const node = new Node(value, previousNode.nextNode);
      previousNode.nextNode = node;
      previousNode = node;
      this.length += 1;
    }

    if (nextNode === null) {
      this.lastNode = previousNode;
    }
  }

  removeAt(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.length) {
      throw new RangeError('Index is outside the bounds of the list.');
    }

    if (index === 0) {
      return this.pop();
    }

    let previousNode = this.firstNode;
    for (let currentIndex = 1; currentIndex < index; currentIndex += 1) {
      previousNode = previousNode.nextNode;
    }

    const removedNode = previousNode.nextNode;
    previousNode.nextNode = removedNode.nextNode;
    this.length -= 1;

    if (removedNode === this.lastNode) {
      this.lastNode = previousNode;
    }

    return removedNode.value;
  }
}

export { LinkedList, Node };
