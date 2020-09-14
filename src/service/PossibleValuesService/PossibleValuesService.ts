import {APIClient, APIMapping} from '../../http';
import {PossibleValue} from '@flowfact/types';

export class PossibleValuesService extends APIClient {
  constructor() {
    super(APIMapping.schemaService);
  }

  getAllPossibleValues = async (schemaName: string) => {
    return this.invokeApiWithErrorHandling<PossibleValue[]>(`/schemas/${schemaName}/possiblevalues`, 'GET', undefined);
  }

  addPossibleValues = async (schemaName: string, possibleValues: any) => {
    return this.invokeApiWithErrorHandling<void>(`/schemas/${schemaName}/possiblevalues`, 'POST', possibleValues);
  }

  deletePossibleValue = async (schemaName: string, fieldName: string, possibleValue: string) => {
    return this.invokeApiWithErrorHandling<void>(`/schemas/${schemaName}/fields/${fieldName}/possiblevalues/${possibleValue}`, 'DELETE');
  }
}

export default new PossibleValuesService();
