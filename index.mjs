import core from '@actions/core';
import github from '@actions/github';
import fs from 'fs';
// const { mkdir } = require("fs/promises");
// const { Readable } = require('stream');
// const { finished } = require('stream/promises');
// const path = require("path");

// const downloadFile = (async (url, fileName) => {
//   const res = await fetch(url);
//   // if (!fs.existsSync("downloads")) await mkdir("downloads"); //Optional if you already have downloads directory
//   // const destination = path.resolve("./downloads", fileName);
//   // const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
//   const fileStream = fs.createWriteStream(fileName, { flags: 'wx' });
//   await finished(Readable.fromWeb(res.body).pipe(fileStream));
// });


try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // `url` input defined in action metadata file
  const url = core.getInput('url');
  const filename = core.getInput('filename')
  console.log(`Fetching ${url}!`);

  const response = await fetch("http://www.stackoverflow.com/");
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filename, buffer)
  // const stream = fs.createWriteStream(filename);
  // await finished(Readable.fromWeb(body).pipe(stream));

  core.setOutput("status", "OK");
  console.log(`${filename} saved!`)
  
} catch (error) {
  core.setFailed(error.message);
}
