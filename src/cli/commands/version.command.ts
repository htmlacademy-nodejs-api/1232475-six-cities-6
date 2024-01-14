import { readFileSync } from 'node:fs';
import chalk from 'chalk';
import { Command } from './command.interface.js';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&

    // проверяет есть ли свойство (ключ со значением) version у json
    Object.prototype.hasOwnProperty.call(value, 'version')
  );
}

export class VersionCommand implements Command {

  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  private readVersion() {

    // Считываем содержимое файла
    const jsonContent = readFileSync(this.filePath, 'utf-8');

    // Преобразовываем JSON-строку в объект JavaScript
    const importedContent = JSON.parse(jsonContent);

    if (! isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName() {
    return '--version';
  };

  public async execute(..._parametrs: string []): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(`
        ${chalk.bgBlueBright('Номер версии.')}
        
        ${chalk.red('version')}: ${version}
      `);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}