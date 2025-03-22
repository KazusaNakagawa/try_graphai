import { Command } from 'commander'
import { exec } from 'child_process'

const webDisplayCommand = new Command('web-display')
  .description('Display data on the web')
  .action(() => {
    console.log('Displaying data on the web...')
    const serverProcess = exec(
      'next dev',
      (err: Error | null, stdout: string, stderr: string) => {
        if (err) {
          console.error(`Error: ${err.message}`)
          return
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`)
          return
        }
        console.log(`Stdout: ${stdout}`)
      },
    )

    if (serverProcess.stdout) {
      serverProcess.stdout.on('data', (data: string) => {
        const portRegex = /http:\/\/localhost:(\d+)/
        const portMatch = portRegex.exec(data)
        if (portMatch) {
          const port = portMatch[1]
          console.log(`Listening on http://localhost:${port}`)
        }
      })
    }

    if (serverProcess.stderr) {
      serverProcess.stderr.on('data', (data: string) => {
        console.error(`Stderr: ${data}`)
      })
    }
  })

export default webDisplayCommand
