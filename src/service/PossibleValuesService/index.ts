import PossibleValuesController from './PossibleValuesController';

export class PossibleValuesService {
    public readonly possibleValues: PossibleValuesController;

    constructor() {
        this.possibleValues = new PossibleValuesController();
    }
}

export const PossibleValuesServiceInstance = new PossibleValuesService();
