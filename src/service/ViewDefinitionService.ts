import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export interface ShortViewDefinition {
	id: string;
	name: string;
	schemaId: string;
}

export interface ViewDefinitionCategory {
	name: string;
	fields: string[];
}

export interface ViewDefinition extends ShortViewDefinition {
	componentId: string;
	categories: ViewDefinitionCategory[];
}

export class ViewDefinitionService extends APIClient {

	constructor() {
		super(APIMapping.viewDefinitionService);
	}

	getDefinitionsForSchema(schemaId: string): Promise<AxiosResponse> {
		return this.invokeApi('/views', 'GET', undefined, {
			queryParams: {
				schemaId
			}
		});
	}

	getDefinition(viewDefinitionId: string): Promise<AxiosResponse> {
		return this.invokeApi(`/views/${viewDefinitionId}`, 'GET');
	}

	updateDefinition(viewDefinitionId: string, viewDefinition: ViewDefinition) {
		return this.invokeApi(`/views/${viewDefinitionId}`, 'PUT', viewDefinition);
	}

	createDefinition(viewDefinition: ViewDefinition) {
		return this.invokeApi('/views', 'POST', viewDefinition);
	}

	deleteDefinition(viewDefinitionId: string) {
		return this.invokeApi(`/views/${viewDefinitionId}`, 'DELETE');
	}

	updateCategory(viewId: string, categoryName: string, categoryDefinition: ViewDefinitionCategory) {
		return this.invokeApi(`/views/${viewId}/categories/${categoryName}`, 'PATCH', categoryDefinition);
	}

	addCategory(viewId: string, categoryDefinition: ViewDefinitionCategory) {
		return this.invokeApi(`/views/${viewId}/categories`, 'PATCH', categoryDefinition);
	}

	deleteCategory(viewId: string, categoryName: string) {
		return this.invokeApi(`/views/${viewId}/categories/${categoryName}`, 'DELETE');
	}

	listFieldsOfViews(viewName: string) {
		return this.invokeApi(`/views/fields/${viewName}`, 'GET');
	}

	getBySchemaAndName(schemaId: string, viewName: string) {
		return this.invokeApi(`/views/schema/${schemaId}/name/${viewName}`, 'GET');
	}
}

export default new ViewDefinitionService();
