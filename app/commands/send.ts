import inquirer from 'inquirer';
import chalk from 'chalk';
import { sendEmail } from '../utils/email';
import { isValidEmail, isNonEmpty } from '../utils/validation';
import { loadConfig } from '../utils/config';

export async function sendCommand() {
  const config = loadConfig();
  const answers = await inquirer.prompt([
    {
      name: 'to',
      message: 'To (email address):',
      validate: (input) => isValidEmail(input) || 'Invalid recipient email',
    },
    {
      name: 'subject',
      message: 'Subject:',
      validate: (input) => isNonEmpty(input) || 'Subject cannot be empty',
    },
    {
      name: 'body',
      message: 'Message body:',
      type: 'editor',
      validate: (input) => isNonEmpty(input) || 'Body cannot be empty',
    },
  ]);
  const sent = await sendEmail({ ...answers, from: config.email });
  console.log(chalk.green('Email sent! ID: ') + sent.id);
}
