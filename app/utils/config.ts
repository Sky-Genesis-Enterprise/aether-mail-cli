import fs from 'fs';
import path from 'path';

export interface AMCConfig {
  email: string;
  apiEndpoint: string;
  configPath: string;
}

// Loads user config from disk or env
export function loadConfig(): Partial<AMCConfig> {
  const configPath = process.env.AMC_CONFIG_PATH || path.join(process.env.HOME || '', '.aethermail', 'config.json');
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      email: process.env.AMC_EMAIL || '',
      apiEndpoint: process.env.AMC_API_ENDPOINT || '',
      configPath,
    };
  }
}

// Save config to configPath
export function saveConfig(cfg: AMCConfig): void {
  const configPath = cfg.configPath || process.env.AMC_CONFIG_PATH || path.join(process.env.HOME || '', '.aethermail', 'config.json');
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
}
