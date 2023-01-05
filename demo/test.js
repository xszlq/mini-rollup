const rollup = require("../src/rollup");
console.log("begin");

rollup(__dirname + "/main.js").then((res) => {
  res.wirte("./demo/bundle.js");
});
