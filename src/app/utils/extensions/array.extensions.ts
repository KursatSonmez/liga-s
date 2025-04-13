Array.prototype.sortBy = function () {
  return this.sort((x, y) => x - y);
};

Array.prototype.reverseBy = function () {
  return this.sort((x, y) => y - x);
};
