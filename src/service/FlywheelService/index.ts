import {FlywheelController} from './FlywheelController';
import {PhaseController} from './PhaseController';
import {PhaseControllerV2} from './PhaseControllerV2';
import {TransactionController} from './TransactionController';

export * from './FlywheelService.Types';

export class FlywheelService {

    public static instance = new FlywheelService();

    public readonly flywheel: FlywheelController;
    public readonly phases: PhaseController;
    public readonly phasesV2: PhaseControllerV2;
    public readonly transaction: TransactionController;

    constructor() {
        this.flywheel = new FlywheelController();
        this.phases = new PhaseController();
        this.phasesV2 = new PhaseControllerV2();
        this.transaction = new TransactionController();
    }
}
