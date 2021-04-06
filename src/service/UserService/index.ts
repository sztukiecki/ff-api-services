import { PublicController } from './PublicController';
import { UsersController } from './UsersController';
import { UsersV2Controller } from './UsersV2Controller';
import { FieldConfigController } from './FieldConfigController';
import { AdditionalDataController } from './AdditionalDataController';

export * from './UserService.Types';

export class UserService {
    public static instance = new UserService();

    public readonly users: UsersController;
    public readonly usersV2: UsersV2Controller;
    public readonly public: PublicController;
    public readonly fieldConfig: FieldConfigController;
    public readonly additionalData: AdditionalDataController;

    constructor() {
        this.users = new UsersController();
        this.usersV2 = new UsersV2Controller();
        this.public = new PublicController();
        this.fieldConfig = new FieldConfigController();
        this.additionalData = new AdditionalDataController();
    }
}

export const UserServiceInstance = new UserService();
