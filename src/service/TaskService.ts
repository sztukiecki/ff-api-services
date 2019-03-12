import { APIClient, APIMapping } from '../http';

export class TaskService extends APIClient {

    constructor() {
        super(APIMapping.taskService);
    }

    getById(id: string) {
        return this.invokeApi(`/task/${id}`, 'GET');
    }

    getTaskForEntityById(entityId: string) {
        return this.invokeApi(`/task/for-entity/${entityId}`, 'GET');
    }

    deleteTask(id: string) {
        return this.invokeApi(`/task/${id}`, 'DELETE');
    }

    createTask(task: object) {
        return this.invokeApi(`/task`, 'POST', task);
    }

    updateTask(id: string, task: object) {
        return this.invokeApi(`/task/${id}`, 'PUT', task);
    }

}

export default new TaskService();
