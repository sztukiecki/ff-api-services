import {FlywheelController} from './FlywheelController';
import {PhaseController} from './PhaseController';
import {PhaseControllerV2} from './PhaseControllerV2';
import {TransactionController} from './TransactionController';
export * from './types';

export class FlywheelService {

    public readonly Flywheel: FlywheelController;
    public readonly Phases: PhaseController;
    public readonly PhasesV2: PhaseControllerV2;
    public readonly Transaction: TransactionController;

    constructor() {
        this.Flywheel = new FlywheelController();
        this.Phases = new PhaseController();
        this.PhasesV2 = new PhaseControllerV2();
        this.Transaction = new TransactionController();
    }
}

export default new FlywheelService();
