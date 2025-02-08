import { Command } from 'commander';
const { exec } = require('child_process');

const webDisplayCommand = new Command('web-display')
  .description('Display data on the web')
  .action(() => {
    console.log('Displaying data on the web...');
    const serverProcess = exec('next dev', (err: Error | null, stdout: string, stderr: string) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });

    serverProcess.stdout.on('data', (data: string) => {
      const portMatch = data.match(/http:\/\/localhost:(\d+)/);
      if (portMatch) {
        const port = portMatch[1];
        console.log(`Listening on http://localhost:${port}`);
      }
    });

    serverProcess.stderr.on('data', (data: string) => {
      console.error(`Stderr: ${data}`);
    });
  });

export default webDisplayCommand;
