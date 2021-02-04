import { PublicController } from './PublicController';
import { UsersController } from './UsersController';

export * from './UserService.Types';
export * from './v2';

export class UserService {
    public static instance = new UserService();

    public readonly users: UsersController;
    public readonly public: PublicController;

    constructor() {
        this.users = new UsersController();
        this.public = new PublicController();
    }
}

export const UserServiceInstance = new UserService();
