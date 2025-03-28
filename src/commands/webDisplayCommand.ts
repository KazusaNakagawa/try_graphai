import { Command } from 'commander'
import { exec } from 'child_process'

const webDisplayCommand = new Command('web-display')
  .description('Display data on the web')
  .action(() => {
    console.log('Displaying data on the web...')
    exec('next dev', (err: Error | null, stdout: string, stderr: string) => {
      if (err) {
        console.error(`Error: ${err.message}`)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        return
      }
      console.log(`Stdout: ${stdout}`)
    })
  })

export default webDisplayCommand
