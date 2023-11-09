const redis = require("redis").createClient({
    password: process.env.REDISPASS,
    socket: {
        host: process.env.REDISHOST,
        port: process.env.REDISPORT
    }
  });
  
  (async () => {
    console.log('connecting to redis client');
    redis.on("error", (error) => console.error(`Ups : ${error}`));
    await redis.connect();
    setInterval(() => {
      redis.FLUSHALL();
    }, 10000);
  })();
  module.exports = redis;