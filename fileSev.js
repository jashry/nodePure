const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");
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
                    return false;
                } else {
                    res.write(data);
                    res.end();
                }
            });
        } else if (req.method == "POST") {
            console.log("POST happened");

            let form = new multiparty.Form({ uploadDir: "./upload" });
            form.parse(req);

            form.on("field", (name, value) => {
                console.log("字段：", name, value);
            });

            form.on("file", (name, value) => {
                console.log("文件字段：", name, value);
            });
            form.on("close", () => {
                console.log("upload");
                res.write("upload finish");
                res.end();
            });
        }
    }
}

fileSev.listen(configlobal.Port, () => {
    console.log(`listen on ${configlobal.Port}`);
});
