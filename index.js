const app = require('./app');

const PORT = 9888;
app.listen(PORT, () => {
  logger.info(`Listening to port ${PORT}`);
});
