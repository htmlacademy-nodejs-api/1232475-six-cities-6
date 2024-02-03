import got from "got";
import { Command } from "./command.interface.js";
import { MockServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from "../../shared/helpers/index.js";

export class GenerateCommand implements Command {
  private initialData!: MockServerData;


  private async load(url: string) {
    try {
      // got - вместо axios, так как он специально для node и имеет лучшую зависимость с node
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  private async write(filepath: string, offerCount: number) {
    // генерация данных для tsv файла
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    // запись в файл стримом
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  // 
  public async execute(...parameters: string[]): Promise<void> {
    // пример полученного массива ['100', './mocks/test-data.tsv', 'http://localhost:3123/api']
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}