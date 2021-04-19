const request = require('supertest');
const httpStatus = require('http-status');
const app = require('./app');

jest.setTimeout(600000); // It can take a long time with multiple requests

const numberOfRequests = 50; // Number of concurrent requests

const median = (values) => {
  const mid = Math.floor(values.length / 2);
  const nums = [...values].sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : nums[mid - 1];
};

describe('PERF', () => {
  describe('GET /load/single', () => {
    test('multiple requests measure time', async () => {
      const promises = [];
      for (let i = 0; i < numberOfRequests; i += 1) {
        promises.push(request(app)
          .get('/single')
          .then((res) => (res.body.time))
          .catch(() => (0)));
      }
      const values = await Promise.all(promises);
      console.log(`
      *************WORKER THREADS*************\n
      ${numberOfRequests} Requests\n
      Total time: ${Math.round(values.reduce((prev, curr) => prev + curr))} ms.\n
      Median: ${Math.round(median(values))} ms.\n
      Average ${Math.round(values.reduce((prev, curr) => prev + curr) / values.length)} ms.\n
      **********************************`);
      expect(1).toEqual(1);
    });
  });
  describe('GET /load/multiple', () => {
    test('multiple requests measure time', async () => {
      const promises = [];
      for (let i = 0; i < numberOfRequests; i += 1) {
        promises.push(request(app)
          .get('/multiple')
          .then((res) => (res.body.time))
          .catch(() => (0)));
      }
      const values = await Promise.all(promises);
      console.log(`
      *************WORKER THREADS*************\n
      ${numberOfRequests} Requests\n
      Total time: ${Math.round(values.reduce((prev, curr) => prev + curr))} ms.\n
      Median: ${Math.round(median(values))} ms.\n
      Average ${Math.round(values.reduce((prev, curr) => prev + curr) / values.length)} ms.\n
      **********************************`);
      expect(1).toEqual(1);
    });
  });
});
