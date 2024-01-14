type ParsedCommand = Record<string, string[]>;

export class CommandParser {

  // метод для поиска команды среди массива пришедшего через process.argv
  static parse(cliArguments: string []): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand: string = '';

    // итеhатор пробегающий по значениям
    for (let argument of cliArguments) {

      // ищем команду среди параметров по первым двум символам
      if (argument.startsWith('--')) {
        // создаем ключ в виде названия команды и присваиваем значения в виде массива 
        // пример
        // parsedCommand: {'--help': []}
        parsedCommand[argument] = [];
        currentCommand = argument;

      //проверка назначилаось значение (команда) в "currentCommand" при предыдущей итерации
      } else if (currentCommand && argument) {
        // ранее созданному ключу с значением в виде массива добавляем что-то, что пользователь написал после названия команды
        parsedCommand[currentCommand].push(argument);
      }
    }

    // возвращает parsedCommand: {'--help': []}
    return parsedCommand;
  }
}