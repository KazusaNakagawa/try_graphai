import { Command } from 'commander'
import analyzeCommand from './commands/analyzeCommand'
import webDisplayCommand from './commands/webDisplayCommand'

const program = new Command()

program
  .version('0.0.1')
  .description('CLI for GraphAI')
  .addCommand(analyzeCommand)
  .addCommand(webDisplayCommand)

program.parse(process.argv)
