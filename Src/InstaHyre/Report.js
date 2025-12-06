const { exec } = require("child_process");
const open = (...args) => import('open').then(m => m.default(...args));

// Start local server
const server = exec("npx http-server Reports -p 8080");

// Once server starts, open browser
server.stdout.on("data", (data) => {
  if (data.includes("Available on:")) {
    setTimeout(() => {
      open("http://127.0.0.1:8080/output.html");
    }, 500);
  }
});
