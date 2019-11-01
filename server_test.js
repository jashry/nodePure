const assert = require("assert");
const path = require("path");
const url = require("url");
const querystring = require("querystring");
const net = require("net");

console.log(path.dirname("./static/regs.html"));
console.log(path.extname("./static/regs.html"));
console.log(path.basename("./static/regs.html"));

console.log(path.resolve(__dirname, "static"));

let ustr = "https://www.bids.com/sin.html?s=1&s2=9";

console.log(url.parse(ustr, true));
console.log(querystring.parse("s=1&s2=9"));

let buf = new Buffer("asbs/r/nasdfes/r/n45s1df23s5d4f/r/n32135q233q2w4d");
console.log(buf.indexOf("/r/n"));

let arr = [];
let n = 0;
while ((n = buf.indexOf("/r/n")) !== -1) {
    arr.push(buf.slice(0, n));
    buf = buf.slice(n + "/r/n".length);
}

arr.push(buf);
console.log(arr);
