import { Command } from 'commander';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import pkg from '../package.json';
import { loginCommand } from './commands/login';
import { sendCommand } from './commands/send';
import { inboxCommand } from './commands/inbox';
import { readCommand } from './commands/read';
import { configCommand } from './commands/config';
import { loadConfig } from './utils/config';

dotenv.config();

const ASCII_BANNER = chalk.cyanBright(`
    ___      _   _               __  __       _ _
   /   | ___| |_| |__   ___ _ _ |  \\/  | __ _| | |
  / /| |/ _ \\ __| '_ \\ / _ \\ '_|| |\\/| |/ _\` | | |
 / ___ |  __/ |_| | | |  __/ |  | |  | | (_| | | |
/_/  |_|\\___|\\__|_| |_|\\___|_|  |_|  |_|\\__,_|_|_|
  (Aether Mail CLI)
`);

async function main() {
  console.log(ASCII_BANNER);

  // Check login/config, prompt if missing
  const config = loadConfig();
  if (!config.email) {
    console.log(chalk.yellow('Welcome! Please log in to your Aether Mail account.'));
    await loginCommand();
  }

  const program = new Command();
  program
    .name('amc')
    .description('Aether Mail CLI: Terminal-based client for Aether Mail')
    .version(pkg.version);

  program.command('login').description('Login to your Aether Mail account').action(loginCommand);
  program.command('send').description('Send an email').action(sendCommand);
  program.command('inbox').description('List inbox messages').action(inboxCommand);
  program.command('read <id>').description('Read a specific message').action((id: string) => readCommand(id));
  program.command('config').description('Show or set configuration').action(configCommand);

  program.on('command:*', () => {
    console.error(chalk.red('Unknown command: ') + program.args.join(' '));
    program.help();
  });

  await program.parseAsync(process.argv);
}

main();