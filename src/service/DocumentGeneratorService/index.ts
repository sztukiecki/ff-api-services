import { GeneratorController } from './GeneratorController';
import DownloadController from './DownloadController';

export * from './DocumentGeneratorService.Types';

export class DocumentGeneratorService {

    public static instance = new DocumentGeneratorService();

    public readonly generator: GeneratorController;
    public readonly download: DownloadController;

    constructor() {
        this.generator = new GeneratorController();
        this.download = new DownloadController();
    }

}

export const DocumentGeneratorServiceInstance = new DocumentGeneratorService();
