const getRandomArbitrary = (min, max) => (
  Math.random() * (max - min) + min
);
const fib = (n) => (
  n > 1
    ? fib(n - 1) + fib(n - 2)
    : n
);
const longProcess = async () => {
  const results = [];
  for (let i = 0; i < getRandomArbitrary(40, 45); i += 1) {
    const result = fib(i);
    results.push(result);
  }
};

module.exports = {
  longProcess,
};
