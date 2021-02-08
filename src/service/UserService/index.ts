import { PublicController } from './PublicController';
import { UsersController } from './UsersController';
import { UsersV2Controller } from './UsersV2Controller';

export * from './UserService.Types';

export class UserService {
    public static instance = new UserService();

    public readonly users: UsersController;
    public readonly usersV2: UsersV2Controller;
    public readonly public: PublicController;

    constructor() {
        this.users = new UsersController();
        this.usersV2 = new UsersV2Controller();
        this.public = new PublicController();
    }
}

export const UserServiceInstance = new UserService();
