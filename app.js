let stopped = false;
class Streamer {
  constructor(path, chunk, req, res) {
    this.path = path ? path : null;
    this.chunk = chunk >= 3 ? chunk : 3;
    this.req = req ? req : null;
    this.res = res ? res : null;
    this.stream = null;

    if (!this.path || !this.req || !this.res) {
      console.log("Incomplete parameters");
      return;
    }
    const range = this.req.headers.range;
    if (!range) return "No range header from client";

    const fs = require("fs");
    const size = fs.statSync(this.path).size;

    const chunkb = Math.pow(10, this.chunk); // -> Default 1KB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkb, size - 1);

    const contentLength = end - start + 1;
    const pathArr = this.path.split(".");

    if (stopped) return;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": `video/${pathArr[pathArr.length - 1]}`,
    };
    this.res.writeHead(206, headers);
    this.stream = fs.createReadStream(this.path, { start, end });
  }

  async start() {
    stopped = false;
    if (!this.stream) return;
    await this.stream.pipe(this.res);
  }

  async stop() {
    if (!this.stream) return;
    if (this.stream.close) this.stream.close();
    else if (this.stream.destroy) this.stream.destroy();
    stopped = true;
  }
}

module.exports = Streamer;
