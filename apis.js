const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const usrsJson = require("./users.json");

let mainFunc = (req, res) => {
    console.log("mainFunc start");
    if (req.method == "GET") {
        console.log("GET IN");
        let { pathname, query } = url.parse(req.url, true);
        complete(req, res, pathname, query);
    } else if (req.method == "POST") {
        console.log("POST IN");
        let path = req.url;
        let query = {};
        let buffers = [];
        req.on("data", buffer => {
            buffers.push(buffer);
        });
        req.on("end", () => {
            query = querystring.parse(buffers.toString());
        });
        complete(req, res, path, query);
    } else {
        console.log("unknow Method");
    }
};

let complete = (req, res, path, query) => {
    console.log(path, query);
    if (path == "/regs.html") {
        fs.readFile("./static" + path, (err, data) => {
            res.write(data);
            res.end();
        });
    }
    if (path == "/PD") {
        console.log(usrsJson);

        usrsJson.usrs.map(item => {
            if (item.name == query.usr) {
                res.write("user name has been registed");
            } else {
                res.write("yoo , good name");
            }
            res.end();
        });
    }
};

let apis = http.createServer((req, res) => {
    mainFunc(req, res);
});

apis.listen(303, () => {
    console.log("listen on port 303");
});
