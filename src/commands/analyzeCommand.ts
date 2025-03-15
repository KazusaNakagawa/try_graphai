import { Command } from 'commander';
import { exec } from 'child_process';
import * as path from 'path';

const analyzeCommand = new Command('analyze')
  .description('Analyze the data')
  .option('-c, --config <path>', 'path to the configuration file', '../config/test_ai_stock_analysis.yaml')
  .action((options) => {
    console.log('Analyzing data...');
    const analysisScript = path.join(__dirname, '../agents/analysis.ts');
    const configPath = path.resolve(__dirname, options.config);
    exec(`ts-node ${analysisScript} --config ${configPath}`, (err: Error | null, stdout: string, stderr: string) => {
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
