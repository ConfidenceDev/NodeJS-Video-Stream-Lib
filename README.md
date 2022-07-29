# NodeJS-Video-Stream-Lib

Stream your video file from nodejs server to client

# Installation

```
npm install videon
```

# Usage

```
// SERVER
// Require the library

const Streamer = require("videon");
const express = require("express");
const app = express();

app.get("/video", (req, res) => {
  const str = new Streamer("/* File Path */", /* Chunk */, req, res);

  // Start stream
  str.start();

  // Stop stream
  str.stop();
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

-----------------------------
// CLIENT

<video class="stream" controls autoplay muted>
    <source src="/video" type="video/mp4" />
</video>
```

# Guide

- File Path: full directory to the video
- Chunk: This determines how much byte would be streamed per peroid rather than the full video, the default and minimum is 3 which would send 1kb. 4 - 10kb, 5 - 100kb, 6 - 1mb and so on.

# Contact

For inquires, support, bug reports and suggestions send me a mail@: confidostic3@gmail.com

- Github: <a href="https://github.com/ConfidenceDev/NodeJS-Video-Stream-Lib" target="_blank">https://github.com/ConfidenceDev/NodeJS-Video-Stream-Lib</a>
- Facebook: Confidence Eze
- Twitter: @ConfidenceDev
- Instagram: @confidence.dev
