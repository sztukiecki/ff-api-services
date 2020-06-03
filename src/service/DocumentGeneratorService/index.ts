import { GeneratorController } from './GeneratorController';
import DownloadController from './DownloadController';
import BookingController from './BookingController';

export * from './DocumentGeneratorService.Types';

export class DocumentGeneratorService {

    public static instance = new DocumentGeneratorService();

    public readonly generator: GeneratorController;
    public readonly download: DownloadController;
    public readonly booking: BookingController;

    constructor() {
        this.generator = new GeneratorController();
        this.download = new DownloadController();
        this.booking = new BookingController();
    }

}

export const DocumentGeneratorServiceInstance = new DocumentGeneratorService();
