import { UsersController } from './UsersController';

export * from '../UserService.Types';

export class UserService {
    public static instance = new UserService();

    public readonly users: UsersController;

    constructor() {
        this.users = new UsersController();
    }
}

export const UserServiceInstance = new UserService();
