const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const configlobal = require("./configlobal");

const fileSev = http.createServer((req, res) => {
    main(req, res);
});

function main(req, res) {
    let urlStr = url.parse(req.url);
    console.log(urlStr.pathname);
    if (urlStr.pathname == "/") {
        if (req.method == "GET") {
            console.log("GET happened");
            fs.readFile("./static/" + "upfile.html", (err, data) => {
                if (err) {
                  console.log(err);
                  return false
                } else {
                    res.write(data);
                    res.end();
                }
            });
        } else if (req.method == "POST") {
            console.log("POST happened");
            let buffers = [];
            req.on("data", buffer => {
                buffers.push(buffer);
            });
            req.on("end", () => {
                console.log(buffers.toString());
            });
        }
    }
}

fileSev.listen(configlobal.Port, () => {
    console.log(`listen on ${configlobal.Port}`);
});
