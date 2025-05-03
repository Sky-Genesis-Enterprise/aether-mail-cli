import { listInbox } from '../utils/email';
import chalk from 'chalk';

export async function inboxCommand() {
  const inbox = await listInbox();
  if (inbox.length === 0) {
    console.log(chalk.gray('Inbox is empty.'));
    return;
  }
  console.log(chalk.yellow.bold('Inbox:'));
  for (const msg of inbox) {
    console.log(
      `${chalk.white(msg.id)} ${msg.read ? chalk.gray('(read)') : chalk.green('(unread)')} - ` +
      `${chalk.cyan(msg.from)} ${chalk.white('→')} ${chalk.cyan(msg.to)} | ` +
      `${chalk.bold(msg.subject)} [${msg.date} ]`
    );
  }
}