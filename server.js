const app = require("./src/app");

const PORT = process.env.PORT || 6969;

const server = app.listen(PORT, () => {
  console.log(`eCommerce start with port : ${PORT}`);
});

// process.env("SIGINT", () => {
//   server.close(() => console.log("Exit Server Express"));
// });
