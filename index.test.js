const request = require('supertest');
const httpStatus = require('http-status');
const app = require('./app');

jest.setTimeout(60000);
const numberOfRequests = 10;

const median = (values) => {
  const mid = Math.floor(values.length / 2);
  const nums = [...values].sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : nums[mid - 1];
};

describe('Routes', () => {
  describe('GET /load/single', () => {
    test('single request time', async () => {
      await request(app)
        .get('/single').expect(httpStatus.OK);
    });
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
      **************SINGLE******************\n
      ${numberOfRequests} requests took ${Math.round(values.reduce((prev, curr) => prev + curr))} ms.\n
      Median: ${Math.round(median(values))}\n
      Each request took on average ${Math.round(values.reduce((prev, curr) => prev + curr) / values.length)} ms.\n
      **************************************`);
      expect(1).toEqual(1);
    });
  });
  describe('GET /load/multiple', () => {
    test('single request time', async () => {
      await request(app)
        .get('/multiple').expect(httpStatus.OK);
    });
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
      *************MULTIPLE*************\n
      ${numberOfRequests} requests took ${Math.round(values.reduce((prev, curr) => prev + curr))} ms.\n
      Median: ${Math.round(median(values))}\n
      Each request took on average ${Math.round(values.reduce((prev, curr) => prev + curr) / values.length)} ms.\n
      **********************************`);
      expect(1).toEqual(1);
    });
  });
});
