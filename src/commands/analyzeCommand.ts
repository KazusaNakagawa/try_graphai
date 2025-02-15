import { Command } from 'commander';
import { exec } from 'child_process';
import * as path from 'path';

const analyzeCommand = new Command('analyze')
  .description('Analyze the data')
  .action(() => {
    console.log('Analyzing data...');
    const analysisScript = path.join(__dirname, '../agents/analysis.ts');
    exec(`ts-node ${analysisScript}`, (err: Error | null, stdout: string, stderr: string) => {
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
