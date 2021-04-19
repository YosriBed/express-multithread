# Multithreading in node.js

### Question

When creating routes in express.js, some routes require cpu-intensive tasks.

How to handle cpu-intensive tasks in node ?

### Answer

Worker threads.

## Performance

Note: Using express.js as a router. Running in dev on a local vm.

`npm run test:watch` (might take some time)

Without worker threads : 
```
**********************************
    
          50 Requests
    
          Total time: 242770 ms.
    
          Median: 3751 ms.
    
          Average 4855 ms.
    
**********************************

```
With worker threads :
```
**********************************
    
          50 Requests
    
          Total time: 731 ms.
    
          Median: 8 ms.
    
          Average 15 ms.
    
**********************************
```
## Code

This code generates a fibonacci sequence

```
const fib = (n) => (
    n > 1
      ? fib(n - 1) + fib(n - 2)
      : n
);
console.time('fibonacci')
for (let i = 0; i < 42; i += 1) {
    fib(i);
}
console.timeEnd('fibonacci');
```

It takes on average 3.7s to run.

Suppose you get multiple concurrent requests on an endpoint that runs this function.
The node.js thread wouldn't be able to efficiently handle these requests.


Worker threads in node.js help to solve this issue.
