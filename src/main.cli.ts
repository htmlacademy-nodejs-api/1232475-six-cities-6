#!/usr/bin/env node
import { CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);

  // передаем полученую комманду из командной строки
  cliApplication.processCommand(process.argv); //process.argv - массив строк (путь к exe файлу ноды, путь к данному файлу, пальше передаваемые параметры) 
}
bootstrap();