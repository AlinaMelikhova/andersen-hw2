function makeObjectDeepCopy(obj) {
  if (typeof obj === 'function') {
    return obj.bind({});
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => {
      return makeObjectDeepCopy(item);
    });
  }

  if (typeof obj === 'object') {
    const clone = Object.assign({}, obj);
    Object.entries(clone).forEach(([key, value]) => {
      clone[key] = makeObjectDeepCopy(value);
    });
    return clone;
  }

  return obj;
}

function selectFromInterval(arr, start, end) {
  if (!Array.isArray(arr)) {
    throw new Error('Not an array');
  }

  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new Error('Invalid interval');
  }

  const result = [];
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  for (const item of arr) {
    if (typeof item !== 'number') {
      throw new Error('Array item not a number');
    }
    if (item >= min && item <= max) {
      result.push(item);
    }
  }

  return result;
}

const myIterable = {};

myIterable[Symbol.iterator] = function () {
  if (typeof this.from !== 'number') {
    throw new Error('From is not a number');
  }

  if (typeof this.to !== 'number') {
    throw new Error('To is not a number');
  }

  const last = this.to;
  let current = this.from;

  return {
    next() {
      if (current > last + 1) {
        throw new Error('From bigger than To');
      }
      if (current <= last) {
        return { done: false, value: current++ };
      }
      return { done: true };
    },
  };
};
