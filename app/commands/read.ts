import { getEmailById } from '../utils/email';
import chalk from 'chalk';

export async function readCommand(id: string) {
  const msg = await getEmailById(id);
  if (!msg) {
    console.error(chalk.red('Email not found by id: ') + id);
    return;
  }
  console.log(`${chalk.yellow('Subject:')} ${chalk.bold(msg.subject)}`);
  console.log(`${chalk.yellow('From:')} ${chalk.cyan(msg.from)}`);
  console.log(`${chalk.yellow('To:')} ${chalk.cyan(msg.to)}`);
  console.log(`${chalk.yellow('Date:')} ${msg.date}`);
  console.log(chalk.white('─'.repeat(40)));
  console.log(msg.body);
}
