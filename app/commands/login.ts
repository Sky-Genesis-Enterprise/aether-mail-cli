import inquirer from 'inquirer';
import chalk from 'chalk';
import { isValidEmail, isStrongPassword } from '../utils/validation';
import { loadConfig, saveConfig } from '../utils/config';

export async function loginCommand() {
  const prompts = await inquirer.prompt([
    {
      name: 'email',
      message: 'Your email:',
      validate: (input) => isValidEmail(input) || 'Invalid email format',
      default: loadConfig().email,
    },
    {
      name: 'password',
      message: 'Password:',
      type: 'password',
      mask: '*',
      validate: (input) => isStrongPassword(input) || 'Password must be at least 8 chars, incl. a letter & number',
    },
  ]);
  // Mock login: Accept any credentials. Implement real logic for production.
  if (prompts.email && prompts.password) {
    saveConfig({ email: prompts.email, apiEndpoint: process.env.AMC_API_ENDPOINT || '', configPath: process.env.AMC_CONFIG_PATH || '', });
    console.log(chalk.green('Login successful as: ') + chalk.bold(prompts.email));
  } else {
    console.error(chalk.red('Login failed.'));
  }
}
