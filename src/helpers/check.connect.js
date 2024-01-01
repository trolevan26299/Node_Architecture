"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// Count Connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  return numConnection;
};

// Check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUse = process.memoryUsage().rss;
    // Example maximum number of connection bases on number of cores
    const maxConnections = numCores * 5;

    console.log(`Active connection :${numConnection}`);
    console.log(`Memory usage: ${memoryUse / 1024 / 1024} MB`);
    if (numConnection > maxConnections) {
      console.log(`Connection overload detected`);
    }
  }, 5000); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverLoad,
};
