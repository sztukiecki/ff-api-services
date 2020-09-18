import {APIClient, APIMapping} from '../../http';
import {PossibleValue} from "@flowfact/types";


export default class PossibleValuesController extends APIClient {
  constructor() {
    super(APIMapping.schemaService);
  }

  async fetchAllPossibleValues(schemaName: string) {
    return this.invokeApiWithErrorHandling<PossibleValue[]>(`/schemas/${schemaName}/possiblevalues`, 'GET', undefined);
  }

  async addPossibleValues(schemaName: string, possibleValues: any) {
    return this.invokeApiWithErrorHandling<void>(`/schemas/${schemaName}/possiblevalues`, 'POST', possibleValues);
  }

  async deletePossibleValue(schemaName: string, fieldName: string, possibleValue: string) {
    return this.invokeApiWithErrorHandling<void>(`/schemas/${schemaName}/fields/${fieldName}/possiblevalues/${possibleValue}`, 'DELETE');
  }
}
