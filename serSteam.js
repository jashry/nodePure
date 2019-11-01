const process = require("process");
const path = require('path')
const sever = require('http').createServer((req,res)=>{
  main(req,res)
}).listen(231,()=>{
  console.log('listen on port 231');
})
const zlib = require("zlib");
const fs = require("fs");
const url = require("url");
console.log(process.env.OS);

let mode = process.env.OS == "Windows_NT" ? "development" : "production";

console.log(mode);

function main(req,res){
  let filePathName = url.parse(req.url,true).pathname
  console.log(url.parse(req.url,true));

    fs.stat(path.resolve('./static'+filePathName),(err,stats)=>{
      if(err){
        console.log('read come an error')
        res.writeHeader(404)
        res.write('Not found!')
        res.end()
      }else{
        let rs = fs.createReadStream(path.resolve('./static'+filePathName))
        let Gzip = zlib.createGzip()
         
        res.setHeader('content-encoding','gzip')
        rs.pipe(Gzip).pipe(res)

      }
    })
  
}
