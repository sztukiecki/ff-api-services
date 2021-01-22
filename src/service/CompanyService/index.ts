import { CompanyController } from './CompanyController';
import { InternalController } from './InternalController';
import { LegislationTextController } from './LegislationTextController';

export * from './CompanyService.Types';

export class CompanyService {
    public static instance = new CompanyService();

    public readonly company: CompanyController;
    public readonly internal: InternalController;
    public readonly legislationText: LegislationTextController;

    constructor() {
        this.company = new CompanyController();
        this.internal = new InternalController();
        this.legislationText = new LegislationTextController();
    }
}

export const CompanyServiceInstance = new CompanyService();
