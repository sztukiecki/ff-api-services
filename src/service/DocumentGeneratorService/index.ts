import { GeneratorController } from './GeneratorController';

export class DocumentGeneratorService {

    public static instance = new DocumentGeneratorService();

    public readonly generator: GeneratorController;

    constructor() {
        this.generator = new GeneratorController();
    }

}

export const DocumentGeneratorServiceInstance = new DocumentGeneratorService();
