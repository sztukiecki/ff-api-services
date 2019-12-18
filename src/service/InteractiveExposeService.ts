import {
  DesignTemplate,
  DesignTemplateAssignment,
  InteractiveExposeMapping,
  InteractiveExposeSettings,
  InteractiveExposeSettingsWithLogos,
  InteractiveExposeTemplate,
  S3File,
  SendInteractiveExposeModel
} from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class InteractiveExposeService extends APIClient {
  constructor() {
    super(APIMapping.interactiveExposeService);
  }

  async getSettings(): Promise<InteractiveExposeSettingsWithLogos> {
    return (await this.invokeApi('/settings', 'GET')).data;
  }

  async changeSettings(
    settings: InteractiveExposeSettings
  ): Promise<InteractiveExposeSettingsWithLogos> {
    return (await this.invokeApi('/settings', 'POST', settings)).data;
  }

  async getPreviewUrl(
    entityId: string,
    templateName: string = 'standard',
    attachDocuments: boolean = false,
    showFinanceCalculator: boolean = false,
    creatorId?: string): Promise<string> {
    return (await this.invokeApi('/preview', 'POST', {
      entityId: entityId,
      templateName: templateName,
      attachDocuments: attachDocuments,
      showFinanceCalculator: showFinanceCalculator,
      creatorId: creatorId,
    })).data;
  }

  async sendInteractiveExpose(
    model: SendInteractiveExposeModel
  ): Promise<AxiosResponse> {
    return await this.invokeApi('/interactiveExposes', 'POST', model);
  }

  async changeLogo(type: 'light' | 'dark', image: File): Promise<S3File> {
    const formData = new FormData();
    formData.append('logo', image);
    return (await this.invokeApi(`/settings/logos/${type}`, 'POST', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data;
  }

  async deleteLogo(type: 'light' | 'dark'): Promise<AxiosResponse> {
    return await this.invokeApi(`/settings/logos/${type}`, 'DELETE');
  }

  /**
   * Get all interactive expose templates.
   * Add a role parameter to filter the templates by the roles.
   */
  async getTemplates(role?: 'OFFER' | 'REPORT'): Promise<AxiosResponse> {
    if (role) {
      return this.invokeApi(
        '/templates',
        'GET',
        {},
        {
          queryParams: {
            role: role
          }
        }
      );
    }

    return this.invokeApi('/templates', 'GET');
  }

  /**
   * Check requirements of the interactive exposé and if necessary solve them
   */
  async checkRequirements(): Promise<AxiosResponse> {
    return this.invokeApi(`/interactiveExposes/checkRequirements`, 'GET');
  }

  /**
   * Get a template by its id.
   */
  async getTemplateById(templateId: string): Promise<AxiosResponse> {
    return this.invokeApi(`/templates/${templateId}`, 'GET');
  }

  /**
   * Gets all existing design Templates of a company
   */
  async fetchDesignTemplates(): Promise<AxiosResponse<DesignTemplate[]>> {
    return this.invokeApi('/interactiveExposes/templates/assignments', 'GET');
  }

  /**
   * Returns all design templates for the company the user is logged in for of the specified type.
   */
  async fetchDesignTemplatesOfType(type: string): Promise<AxiosResponse<DesignTemplate[]>> {
    return this.invokeApi('/interactiveExposes/templates/assignments/?type=' + type, 'GET');
  }

  async updateDesignTemplates(
    designTemplates: DesignTemplateAssignment[]
  ): Promise<AxiosResponse> {
    return this.invokeApi(
      '/interactiveExposes/templates/assignments',
      'POST',
      designTemplates,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  async deleteDesignTemplates(
    designTemplates: DesignTemplateAssignment[]
  ): Promise<AxiosResponse> {
    return this.invokeApi(
      '/interactiveExposes/templates/assignments',
      'DELETE',
      designTemplates,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  /**
   * Create a new interactive expose template.
   * @param template
   * @param fillDefaultContent
   *      true if the content of the template have to be filled with default content
   */
  async createTemplate(
    template: InteractiveExposeTemplate,
    fillDefaultContent: boolean = false
  ): Promise<AxiosResponse> {
    const queryParams = {
      queryParams: {
        fillDefaultContent: String(fillDefaultContent)
      }
    };

    return this.invokeApi('/templates', 'POST', template, queryParams);
  }

  async createInteractiveExposeTemplate(templateName: string, body: FormData) {
    return this.invokeApi(
      '/interactiveExposes/templates/' + templateName,
      'POST',
      body,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
  }

  async uploadInteractiveExposeTemplateFiles(
    templateName: string,
    body: FormData
  ) {
    return this.invokeApi(
      '/interactiveExposes/templates/' + templateName,
      'PUT',
      body,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
  }

  async deleteInteractiveExposeTemplate(templateName: string) {
    return this.invokeApi(
      '/interactiveExposes/templates/' + templateName,
      'DELETE'
    );
  }

  async fetchInteractiveExposeTemplateFiles(templateName: string) {
    return this.invokeApi(
      '/public/interactiveExposes/templates/' + templateName,
      'GET'
    );
  }

  async fetchInteractiveExposeTemplateFilesByFileType(
    templateName: string,
    fileType: String
  ) {
    return this.invokeApi(
      `/public/interactiveExposes/templates/${templateName}/fileType/${fileType}`,
      'GET'
    );
  }

  async fetchInteractiveExposeTemplateFileData(
    templateName: string,
    fileType: string,
    body: string[]
  ) {
    return this.invokeApi(
      `/public/interactiveExposes/templates/${templateName}/fileType/${fileType}/content`,
      'POST',
      body,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  /**
   * Update a interactive expose template by his id.
   */
  async updateTemplate(
    templateId: string,
    template: InteractiveExposeTemplate
  ): Promise<AxiosResponse> {
    return this.invokeApi(`/templates/${templateId}`, 'PUT', template);
  }

  /**
   * Delete a interactive expose template on the server.
   */
  async deleteTemplate(templateId: string): Promise<AxiosResponse> {
    return this.invokeApi(`/templates/${templateId}`, 'DELETE');
  }

  /**
   * Add a domain to the company.
   */
  async addDomain(domain: string): Promise<AxiosResponse> {
    return this.invokeApi('/domain', 'POST', '', { queryParams: { domain } });
  }

  /**
   * Uninitialize the company domain.
   */
  async startDomainTeardown(): Promise<AxiosResponse> {
    return this.invokeApi('/domain/startTeardown', 'POST');
  }

  /**
   * Perform the setup steps for the domain.
   */
  async setupDomain(): Promise<AxiosResponse> {
    return this.invokeApi('/domain/setup', 'POST');
  }

  /**
   * Get interactive expose mapping. Default mapping is just named so, cause of convienience
   */
  async getMappingOrDefault(
    schemaId: string = 'defaultMapping'
  ): Promise<AxiosResponse> {
    return this.invokeApi(`/mapping/${schemaId}`, 'GET');
  }

  /**
   * Get interactive expose mapping. Default mapping is just named so, cause of convienience
   */
  async getAllMappings(): Promise<AxiosResponse> {
    return this.invokeApi('/mapping/all', 'GET');
  }

  /**
   * Update interactive expose mapping
   */
  async updateMapping(
    mapping: InteractiveExposeMapping
  ): Promise<AxiosResponse> {
    return this.invokeApi('/mapping', 'PUT', mapping);
  }

  /**
   * Put restored example legislation texts into the company scoped default mapping
   */
  async restoreDefaults(): Promise<AxiosResponse> {
    return this.invokeApi('/mapping/restoreDefaults', 'PUT', undefined, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Sets the last activity time of the user session
   */
  keepAlive(token: string, userSessionId: string): Promise<AxiosResponse> {
    return this.invokeApi(
      '/public/interactiveExposes/keepAlive',
      'GET',
      {},
      {
        queryParams: {
          token,
          userSessionId
        }
      }
    );
  }
}

export default new InteractiveExposeService();
