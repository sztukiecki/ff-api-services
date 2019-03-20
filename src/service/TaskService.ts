import { APIClient, APIMapping } from '../http';

export class TaskService extends APIClient {

    constructor() {
        super(APIMapping.taskService);
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    async fetchById(id: string) {
        return await this.invokeApi(`/task/${id}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param entityId
     */
    async fetchTaskForEntityById(entityId: string) {
        return await this.invokeApi(`/task/for-entity/${entityId}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    async deleteTask(id: string) {
        return await this.invokeApi(`/task/${id}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * @param task
     */
    async createTask(task: object) {
        return await this.invokeApi(`/task`, 'POST', task);
    }

    /**
     * TODO: Please comment this method
     * @param id
     * @param task
     */
    async updateTask(id: string, task: object) {
        return await this.invokeApi(`/task/${id}`, 'PUT', task);
    }

}

export default new TaskService();
