import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  
  public getName() {
    return '--import';
  };
  
  private onImportedLine(line: string) {

    // createOffer - преобразует в объект
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    // сообщает о том сколько строк было в конечном итоге импортировано
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {

    // if (parameters.length === 0) {
    //   console.error('Error: Missing filename for import command.');
    //   return;
    // }

    // Чтение файла
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename && filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
      // console.log(fileReader.toArray());
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  };
}