const HTTPLogger = (req, res, next) => {
  const currentTime = new Date().toISOString();

  if (!global.requestCounts) {
    global.requestCounts = {};
  }

  const method = req.method;

  if (!global.requestCounts[method]) {
    global.requestCounts[method] = 0;
  }

  global.requestCounts[method]++;

  console.log(`[${currentTime}] ${method} ${req.originalUrl}`);
  
  console.log(`Request Count for ${method}: ${global.requestCounts[method]}`);

  next();
};

export default HTTPLogger;