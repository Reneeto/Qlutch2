const redis = require("redis").createClient({
    // password: 'w9ddXaBTKl5wc8Os31IZPsIMdI9MRvhd',
    password: process.env.REDISPASS,
    socket: {
    //   host: 'redis-19943.c309.us-east-2-1.ec2.cloud.redislabs.com',
        host: process.env.REDISHOST,
        port: process.env.REDISPORT
        // port: 19943
    }
  });
  
  (async () => {
    console.log('connecting to redis client');
    redis.on("error", (error) => console.error(`Ups : ${error}`));
    await redis.connect();
  })();
  
  module.exports = redis;