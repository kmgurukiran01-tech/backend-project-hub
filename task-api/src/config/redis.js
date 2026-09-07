const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

redisClient.on("error", (error) => {
    console.error("Redis error:", error);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error("Redis connection failed:", error);
        throw error;
    }
};

module.exports = {
    redisClient,
    connectRedis
};