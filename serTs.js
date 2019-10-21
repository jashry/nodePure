const assert = require('assert')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
const net = require('net')

console.log(path.dirname('./static/regs.html')); 
console.log(path.extname('./static/regs.html')); 
console.log(path.basename('./static/regs.html')); 


console.log(path.resolve(__dirname,'static'))


let ustr = 'https://www.bids.com/sin.html?s=1&s2=9'

console.log( url.parse(ustr,true));


