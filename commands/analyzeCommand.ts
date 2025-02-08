import { Command } from 'commander';
const { exec } = require('child_process');

const analyzeCommand = new Command('analyze')
  .description('Analyze the data')
  .action(() => {
    console.log('Analyzing data...');
    exec('ts-node agents/analysis.ts', (err: Error | null, stdout: string, stderr: string) => {
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
  });

export default analyzeCommand;
