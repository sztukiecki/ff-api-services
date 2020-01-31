import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { APIClientAdditionalParams } from '../http/APIClient';
import { ProofOfActivityEmailFromTo,
  ProofOfActivityDateRange,
  ProofOfActivityEntityIdSchema,
  Captions,
  ProofOfActivityStatistics,
  ProofOfActivityResultViewColumns,
  ProofOfActivityActivity,
  ProofOfActivityActivityDataUpdate,
  ProofOfActivityUpdateTemplateData,
  ProofOfActivityExcludeItems
} from '@flowfact/types';

export class ProofOfActivityService extends APIClient {
  constructor() {
    super(APIMapping.proofOfActivityService);
  }

  // E-Mail
  // [POST] /email/send
  async sendEmail(
    email: ProofOfActivityEmailFromTo,
    dateRange: ProofOfActivityDateRange,
    activityId: string,
    templateId: string,
    entity: ProofOfActivityEntityIdSchema,
    excludeItems?: ProofOfActivityExcludeItems[],
    options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi('/email/send', 'POST', {email, dateRange, activityId, templateId, entity, excludeItems}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [POST] /email/preview
  async emailPreview(
    email: ProofOfActivityEmailFromTo,
    dateRange: ProofOfActivityDateRange,
    activityId: string,
    templateId: string,
    entity: ProofOfActivityEntityIdSchema,
    excludeItems?: ProofOfActivityExcludeItems[],
    options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(
        '/email/preview',
        'POST',
        {email, dateRange, activityId, templateId, entity, excludeItems},
        {...{headers: { 'content-type': 'application/json', 'Accept': 'text/html' }}, ...options}
      );
    } catch (error) {
      throw(error);
    }
  }

  // [POST] /email/template-model
  async emailTemplateModel(
    email: ProofOfActivityEmailFromTo,
    dateRange: ProofOfActivityDateRange,
    activityId: string,
    templateId: string,
    entity: ProofOfActivityEntityIdSchema,
    excludeItems?: ProofOfActivityExcludeItems[],
    options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(
        '/email/template-model',
        'POST',
        {email, dateRange, activityId, templateId, entity, excludeItems},
        {...{ headers: { 'content-type': 'application/json' } }, ...options}
      );
    } catch (error) {
      throw(error);
    }
  }

  // ProofOfActivity
  // [GET] / 
  async getActivitys(lastId?: String, size?: Number, options?: APIClientAdditionalParams): Promise<AxiosResponse<ProofOfActivityActivity>> {
    try {
      return await this.invokeApi('/', 'GET', {lastId, size}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [POST] /
  async addActivity(
    id: string,
    companyId: string,
    captions: Captions,
    statistics: ProofOfActivityStatistics[],
    resultViewColumns?: ProofOfActivityResultViewColumns[],
    options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi('/', 'POST', {id, companyId, captions, resultViewColumns, statistics}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [PATCH] /:id
  async updateActivity(id: string, data: ProofOfActivityActivityDataUpdate[], options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/${id}`, 'PATCH', JSON.stringify(data), options);
    } catch (error) {
      throw(error);
    }
  }

  // [GET] /:id
  async getActivity(id: string, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/${id}`, 'GET', {}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [POST] /:id/data
  async getActivityData(
    id: string,
    entity: ProofOfActivityEntityIdSchema,
    dateRange: ProofOfActivityDateRange,
    options?: APIClientAdditionalParams
  ): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/${id}/data`, 'POST', {dateRange, entity}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [DELETE] /:id
  async deleteActivity(id: string, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/${id}`, 'DELETE', {}, options);
    } catch (error) {
      throw(error);
    }
  }
  
  // Template
  // [GET] /template
  async getTemplates(lastId?: String, size?: Number, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/template`, 'GET', {lastId, size}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [POST] /template
  async addTemplate(id: string, companyId: string, prefix: string, captions: Captions, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi('/template', 'POST', {id, companyId, prefix, captions}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [GET] /template/:id
  async getTemplate(id: string, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/template/${id}`, 'GET', {}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [PATCH] /template/:id
  async updateTemplate(id: string, data: ProofOfActivityUpdateTemplateData[], options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/template/${id}`, 'PATCH', JSON.stringify(data), options);
    } catch (error) {
      throw(error);
    }
  }

  // [DELETE] /template/:id
  async deleteTemplate(id: string, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/template/${id}`, 'DELETE', {}, options);
    } catch (error) {
      throw(error);
    }
  }

  // [PUT] /template/:id/upload
  async uploadTemplate(id: string, body: FormData, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/template/${id}/upload`, 'PUT', body, options);
    } catch (error) {
      throw(error);
    }
  }

  // [PUT] /template/:id/upload
  async uploadTemplateFile(id: string, body: FormData, options?: APIClientAdditionalParams): Promise<AxiosResponse> {
    try {
      return await this.invokeApi(`/template/${id}/upload-file`, 'PUT', body, options);
    } catch (error) {
      throw(error);
    }
  }

  // [post] /example
  async createExample() {
    try {
      return await this.invokeApi('/example', 'POST');
    } catch (error) {
      throw(error);
    }
  }

}

export default new ProofOfActivityService();
