import { loadConfig, saveConfig, AMCConfig } from '../utils/config';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function configCommand() {
  const config = loadConfig();
  console.log(chalk.blue.bold('[Aether Mail CLI config]'));
  console.log(config);
  const { edit } = await inquirer.prompt([
    { type: 'confirm', name: 'edit', message: 'Edit config?', default: false },
  ]);
  if (edit) {
    const newCfg = await inquirer.prompt([
      { name: 'email', message: 'Email:', default: config.email },
      { name: 'apiEndpoint', message: 'Aether API endpoint:', default: config.apiEndpoint },
      { name: 'configPath', message: 'Config file path:', default: config.configPath },
    ]);
    saveConfig(newCfg as AMCConfig);
    console.log(chalk.green('Config updated.'));
  }
}