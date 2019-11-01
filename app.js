const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

const main = (req, res) => {
    if (req.method == "GET") {
        let { pathname, query } = url.parse(req.url, true);
        console.log("pathname: ", pathname, "query: ", query);
        fs.readFile("./static/" + req.url, (err, buffer) => {
            if (err) {
                console.log(err);
            } else {
                res.write(buffer);
                res.end();
            }
        });
    } else if (req.method == "POST") {
        console.log("pathname: ", req.pathname);
        let buffers = [];
        req.on("data", buffer => {
            buffers.push(buffer);
        });
        req.on("end", () => {
            console.log(querystring.parse(buffers.toString()));
        });
    }
};

const apps = http.createServer((req, res) => {
    main(req, res);
});

apps.listen(302, () => {
    console.log("listen on port:302");
});
