const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // `url` input defined in action metadata file
  const url = core.getInput('url');
  const filename = core.getInput('filename')
  console.log(`Fetching ${url}!`);
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      fs.writeFileSync(filename, blob)
      core.setOutput("status", "OK");
      console.log(`${filename} saved!`)
    })
  
} catch (error) {
  core.setFailed(error.message);
}
