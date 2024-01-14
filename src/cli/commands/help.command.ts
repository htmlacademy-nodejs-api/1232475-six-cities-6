import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parametrs: string[]): Promise<void> {
    console.log(`
      ${chalk.bgBlueBright('Программа для подготовки данных для REST API сервера.')}
      
      ${chalk.gray('Пример')}:
      cli.js --<command> [--arguments]
      ${chalk.gray('Команды')}:
        ${chalk.red('--version')}:                         ${chalk.blue('# выводит номер версии')}
        ${chalk.red('--help')}:                            ${chalk.blue('# печатает этот текст')}
        ${chalk.red('--import <path>')}:                   ${chalk.blue('# импортирует данные из TSV')}
        ${chalk.red('--generate <n> <path> <url>')}:       ${chalk.blue('# генерирует произвольное количество тестовых данных')}
    `);
  }
};