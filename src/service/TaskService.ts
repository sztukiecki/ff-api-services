import { APIClient, APIMapping } from '../http';

export class TaskService extends APIClient {

	constructor() {
		super(APIMapping.taskService);
	}

	getById(id: string) {
		return this.invokeApi(`/task/${id}`, 'GET').then(s => s.data);
	}

	getTaskForEntityById(entityId: string) {
		return this.invokeApi(`/task/forEntity/${entityId}`, 'GET').then(s => s.data);
	}

	deleteTask(id: string) {
		return this.invokeApi(`/task/${id}`, 'DELETE').then(s => s.data);
	}

	createTask(task: object) {
		return this.invokeApi(`/task`, 'POST', task).then(s => s.data);
	}

	updateTask(id: string, task: object) {
		return this.invokeApi(`/task/${id}`, 'PUT', task).then(s => s.data);
	}

}

export default new TaskService();
