import { CommandParser } from "./index.js"
import { Command } from "./commands/command.interface.js";

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  // объект с ключами в виде команд и значениями в виде экземпляров классов
  // пример:
  // this.commands = {
  //   '--help': new HelpCommand(),
  //   '--version': new VersionCommand(),
  //   '--import': new ImportCommand(),
  // };
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  // 1
  // метод принимаем в качестве агумента массив земпляров классов с командами
  public registerCommands(commandList: Command[]): void {
    commandList.forEach(command => {
      
      // проверка на случай если продублировали экзепляр класса
      if (command.getName() in this.commands) {
        throw new Error(`Command ${command.getName()} is already registered`);
      };

      // присвоение значения в виде команды и значения в виде экзепляра класса
      this.commands[command.getName()] = command;
    });
  }
  
  
  // 3
  // возвращаем экземпляр класса по названию команды переданный в качестве параметра
  public getCommand(commandName: string) {

    // проверка на наличие команды (полученной через process.argv) в объекте commands, который создали ранее
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }


  // 2
  // получаем в качестве аргумента process.argv (массив строк)
  public processCommand(argv: string[]) {

    // передаем массив аргументов для получения обекта, где ключе - команда
    const parsedCommand = CommandParser.parse(argv); // получаем parsedCommand: {'--help': []}
    
    // получае оезультат commandName === '--help' (или любая другая команда), 
    // так как Object.keys(parsedCommand) нам возвращает единственный ключ в виде названия команды
    const [commandName] = Object.keys(parsedCommand); 

    // в виде значения присваиваем экземпляр класса
    const command = this.getCommand(commandName);

    // ВСЕГДА ПУСТОЙ МАССИВ ТАК КАК У НАС У ВСЕХ КЛЮЧЕЙ ПО НАЗВАНИЮ КОМАНД ПРИСВОЕН МАССИВ  
    const commandArguments = parsedCommand[commandName] ?? [];

    // вызываем метод execute (данный метод вызваем консоль) у класса команды через полученный экземпляр класса
    command.execute(...commandArguments);
  }
}