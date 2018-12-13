import { APIClient, APIMapping } from '../http';

export class TaskService extends APIClient {

	constructor() {
		super(APIMapping.taskService);
	}

	getAll() {
		return this.invokeApi('/tasks', 'GET').then(s => s.data);
	}

	getById(id: string) {
		return this.invokeApi(`/tasks/${id}`, 'GET').then(s => s.data);
	}

}

export default new TaskService();
