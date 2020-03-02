import ExampleController from './ExampleController';

export * from './types';

export default class ExampleService {

    public static instance = new ExampleService();

    public readonly ExampleController: ExampleController;

    constructor() {
        this.ExampleController = new ExampleController();
    }
}
