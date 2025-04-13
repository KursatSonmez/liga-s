Array.prototype.sortBy = function (field?: string) {
  if (!field)
    return this.sort((x, y) => x - y);

  const arr = this;

  if (!arr.length)
    return [];

  if (typeof arr[0][field] !== 'number')
    throw new Error('sortBy currently only supports numeric types');

  return arr.sort((x, y) => x[field] - y[field]);
};

Array.prototype.reverseBy = function (field?: string) {
  if (!field)
    return this.sort((x, y) => y - x);

  const arr = this;

  if (!arr.length)
    return [];

  let sortContent;
  if (typeof arr[0][field] === 'string') {
    sortContent = (x: any, y: any) => {
      const a: string = x[field], b: string = y[field];
      return a.localeCompare(b) * -1;
    }
  }
  else if (typeof arr[0][field] === 'number') {
    sortContent = (x: any, y: any) => y[field] - x[field];
  }
  else
    throw new Error('reverseBy invalid type!');

  return arr.sort(sortContent);
};

Array.prototype.orderBy = function (...fields: any[]) {
  if (!fields)
    return this.sort((x, y) => x - y);

  const arr = this;

  if (!arr.length)
    return [];

  return arr.sort((x, y) => {
    for (const field of fields) {
      let desc = false;
      let key = field;

      if (typeof field === 'string' && field.startsWith('-')) {
        desc = true;
        key = field.slice(1);
      }

      const xVal = x[key];
      const yVal = y[key];

      if (xVal === yVal) continue;

      if (typeof xVal === 'number' && typeof yVal === 'number')
        return desc ? yVal - xVal : xVal - yVal;

      return desc
        ? (<string>yVal).localeCompare(xVal)
        : (<string>xVal).localeCompare(yVal);
    }

    return 0;
  });
};
