const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_PORT,
  REDIS_URL,
} = require("./config/config");
const { catchAllErrors } = require("./common/errorHandler");
const allRoutes = require("./routes/allRoutes.routes");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const redisClient = redis.createClient({
  url: `redis://${REDIS_URL}:6379`,
});
redisClient.connect();

const connectWithRetry = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )
    .then(() => console.log("DB Successfully connected"))
    .catch((err) => {
      console.log(err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

function main() {
  const port = process.env.PORT || 3000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('trust proxy', 1);

  connectWithRetry();
  redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
  });
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true, maxAge: 30000 },
    })
  );
  app.use(allRoutes);

  app.use(catchAllErrors);
  app.listen(port, () => {
    console.log(`App run on: http://localhost:${port}`);
  });
}

main();
