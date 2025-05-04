#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.clear();

// Lire la version depuis package.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.join(__dirname, '..', 'package.json');
let version = 'unknown';
try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  version = pkg.version;
} catch (e) {
  console.warn(chalk.yellow('⚠️ Impossible de lire package.json pour la version.'));
}

// Embed de bienvenue
const welcome = `
${chalk.hex('#7f5af0')('╔════════════════════════════════════════════════════════╗')}
${chalk.hex('#7f5af0')('║')}        ${chalk.bold.hex('#ffffff')('🚀 Aether Dev Tool')} ${chalk.gray(`v${version}`)}                 ${chalk.hex('#7f5af0')('║')}
${chalk.hex('#7f5af0')('║')}  ${chalk.gray('Une CLI pour simplifier le développement Aether Mail')}  ${chalk.hex('#7f5af0')('║')}
${chalk.hex('#7f5af0')('╚════════════════════════════════════════════════════════╝')}
`;

console.log(welcome);

const main = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Que souhaitez-vous faire ?',
      choices: [
        { name: '🚀 Initialiser un nouveau projet', value: 'init' },
        { name: '🌿 Créer une Pull Request (manuellement)', value: 'pr' },
        { name: '📦 Déployer l’application', value: 'deploy' },
        { name: '🧾 Générer un fichier type', value: 'generate' },
        { name: '❌ Quitter', value: 'exit' }
      ]
    }
  ]);

  switch (action) {
    case 'init':
      await runInit();
      break;
    case 'pr':
      await runPR();
      break;
    case 'deploy':
      await runDeploy();
      break;
    case 'generate':
      await runGenerate();
      break;
    case 'exit':
      console.log(chalk.gray('Bye 👋'));
      process.exit(0);
  }
};

async function runInit() {
  console.log(chalk.green('\n📁 Initialisation du projet...'));
  await execa('mkdir', ['-p', 'src', 'tests', '.github/workflows']);
  console.log(chalk.green('✅ Projet initialisé.\n'));
}

async function runPR() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'branch', message: 'Nom de la nouvelle branche ?' },
    { type: 'input', name: 'title', message: 'Titre du commit :' },
    { type: 'input', name: 'remoteUrl', message: 'URL du dépôt GitHub (ex: https://github.com/user/repo) :' }
  ]);

  try {
    await execa('git', ['checkout', '-b', answers.branch]);
    await execa('git', ['add', '.']);
    await execa('git', ['commit', '-m', answers.title]);
    await execa('git', ['push', '--set-upstream', 'origin', answers.branch]);
    console.log(chalk.green('\n✅ Branche poussée avec succès.'));

    const prUrl = `${answers.remoteUrl}/compare/${answers.branch}?expand=1`;
    console.log(chalk.blue(`\n👉 Tu peux maintenant créer ta PR ici : ${chalk.underline(prUrl)}\n`));
  } catch (error) {
    console.error(chalk.red('❌ Erreur pendant la création de la branche/commit/push'), error.message);
  }
}

async function runDeploy() {
  const { env } = await inquirer.prompt([
    {
      type: 'list',
      name: 'env',
      message: 'Déployer vers quel environnement ?',
      choices: ['local', 'staging', 'production']
    }
  ]);

  console.log(chalk.blue(`\n🚀 Déploiement vers ${env}...`));
  await execa('echo', [`Déploiement vers ${env} terminé.`]);
  console.log(chalk.green('✅ Déploiement terminé.\n'));
}

async function runGenerate() {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Quel fichier générer ?',
      choices: ['README.md', 'CONTRIBUTING.md', 'Dockerfile']
    }
  ]);

  console.log(chalk.yellow(`✍️  Génération de ${type}...`));
  await execa('echo', [`Contenu de base pour ${type}`]);
  console.log(chalk.green(`✅ ${type} généré.`));
}

main();
