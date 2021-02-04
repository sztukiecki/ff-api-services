import { UsersController } from './UsersController';

export * from '../UserService.Types';

export class UserServiceV2 {
    public static instance = new UserServiceV2();

    public readonly users: UsersController;

    constructor() {
        this.users = new UsersController();
    }
}

export const UserServiceInstanceV2 = new UserServiceV2();
