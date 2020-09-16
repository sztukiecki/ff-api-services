import { FlywheelController } from './FlywheelController';
import { PhaseController } from './PhaseController';
import { PhaseControllerV2 } from './PhaseControllerV2';
import { TransactionController } from './TransactionController';
import { TemplateController } from './TemplateController';

export * from './FlywheelService.Types';

export class FlywheelService {
    public static instance = new FlywheelService();

    public readonly flywheel: FlywheelController;
    public readonly phases: PhaseController;
    public readonly phasesV2: PhaseControllerV2;
    public readonly transaction: TransactionController;
    public readonly templates: TemplateController;

    constructor() {
        this.flywheel = new FlywheelController();
        this.phases = new PhaseController();
        this.phasesV2 = new PhaseControllerV2();
        this.transaction = new TransactionController();
        this.templates = new TemplateController();
    }
}

export const FlywheelServiceInstance = new FlywheelService();
