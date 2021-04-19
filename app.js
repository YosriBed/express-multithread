const express = require('express');
const cors = require('cors');
const {isMainThread, parentPort, Worker} = require('worker_threads')

const { longProcess } = require('./functions');

const app = express();

app.use(cors());

app.get('/single', async (req, res) => {
  const start = window.performance.now();
  await longProcess();
  const end = window.performance.now();
  const time = end - start;
  res.status(200).json({ time });
});

app.get('/multiple', async (req, res) => {
  try {
    const startTime = window.performance.now();
    if (isMainThread) {
      const min = 2;
      const max = 1e7;
      const threadCount = +process.argv[2] || 2;
      const threads = new Set();
      const range = Math.ceil((max - min) / threadCount);
      let start = min;
      for (let i = 0; i < threadCount - 1; i += 1) {
        const myStart = start;
        threads.add(new Worker(__filename, { workerData: { start: myStart, range } }));
        start += range;
      }
      threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }));
      for (const worker of threads) {
        worker.on('error', (err) => { throw err; });
        worker.on('exit', () => {
          threads.delete(worker);
        });
        worker.on('message', () => {});
      }
    } else {
      await longProcess();
      parentPort.postMessage('end');
    }
    const end = window.performance.now();
    const time = end - startTime;
    res.status(200).json({ time });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = app;
