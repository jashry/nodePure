const http = require("http");
const fs = require("fs");
const apps = http.createServer((req, res) => {
    // console.log("create success");
    fs.readFile(`./${req.url}`, (err, buffer) => {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.end();
        } else {
            res.write(buffer);
            res.end();
        }


        
    });
});

apps.listen(320, () => {
    console.log("listen on port:320");
});
