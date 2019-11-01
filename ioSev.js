const http = require("http");

const configlobal = require("./configlobal");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        fs.readFile("./static/socket.html", (err, data) => {
            res.write(data);
            res.end();
        });
    }
});

const io = require("socket.io")(server);

io.on("connection", client => {
    client.on("comit", mdata => {
        console.log("talk with client on comit", mdata);
    });
    setInterval(() => {
        client.emit("sermit", `this msg is from server ${Date.now()}`);
    }, 1600);
    client.on("disconnect", () => {
        console.log("client is disconnected");
    });
});

server.listen(configlobal.Port);
