import { TSVFileReader } from '../../shared/libs/filereader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  
  public getName() {
    return '--import';
  };

  public execute(...parameters: string[]): void {

    if (parameters.length === 0) {
      console.error('Error: Missing filename for import command.');
      return;
    }

    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename && filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  };
}