import { APIClient, APIMapping } from '../http';
import FileModel from "../util/FileModel";
import { AxiosResponse } from "axios";

export interface InteractiveExposeColors {
    accent: string;
    accentContrast: string;
}

export interface InteractiveExposeSettings {
    colors: InteractiveExposeColors;
    theme: string;
    urlIdentifier: string;
}

export interface InteractiveExposeLogos {
    dark: string;
    light: string;
}

export interface InteractiveExposeSettingsWithLogos extends InteractiveExposeSettings {
    logos: InteractiveExposeLogos;
}

export interface InteractiveExposeTemplate {
    id: string,
    name: string,
    description: string,
    body: string,
    type: string,
    role: string,
    assignedSchemas: string[],
    creatorId: string,
    updaterId: string
}

export class InteractiveExposeService extends APIClient {

    constructor() {
        super(APIMapping.interactiveExposeService);
    }

    async getSettings(): Promise<InteractiveExposeSettingsWithLogos> {
        return (await this.invokeApi('/settings', 'GET')).data;
    }

    async changeSettings(settings: InteractiveExposeSettings): Promise<InteractiveExposeSettingsWithLogos> {
        return (await this.invokeApi('/settings', 'POST', settings)).data;
    }

    async getPreviewUrl(entityId: string): Promise<string> {
        return (await this.invokeApi('/preview', 'POST', {entityId: entityId})).data;
    }

    async sendInteractiveExpose(recipientId: string, objectId: string, recipientEmailAddress: string, hideRecommendations: boolean = false, emailTemplateId: string = ''): Promise<string> {
        return (await this.invokeApi('/interactiveExposes', 'POST', {
            recipientId: recipientId,
            objectId: objectId,
            recipientEmailAddress: recipientEmailAddress,
            hideRecommendations: hideRecommendations,
            emailTemplate: {
                templateId: emailTemplateId
            }
        })).data;
    }

    async changeLogo(type: 'light' | 'dark', image: File): Promise<FileModel> {
        const formData = new FormData();
        formData.append('logo', image);
        return (await this.invokeApi(`/settings/logos/${type}`, 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}})).data;
    }

    /**
     * Get all interactive expose templates.
     * Add a role parameter to filter the templates by the roles.
     *
     * @param {"OFFER" | "REPORT"} role
     * @returns {Promise<AxiosResponse>}
     */
    async getTemplates(role: 'OFFER' | 'REPORT' | undefined): Promise<AxiosResponse> {
        if (role) {
            return await this.invokeApi('/templates', 'GET', {}, {
                queryParams: {
                    role: role
                }
            });
        }

        return await this.invokeApi('/templates', 'GET');
    }

    /**
     * Get a template by his id.
     * @param {string} templateId
     * @returns {Promise<AxiosResponse>}
     */
    async getTemplateById(templateId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/templates/${templateId}`, 'GET');
    }

    /**
     * Create a new interactive expose template.
     * @param {InteractiveExposeTemplate} template
     * @param {boolean} fillDefaultContent
     *      true if the content of the template have to be filled with default content
     * @returns {Promise<AxiosResponse>}
     */
    async createTemplate(template: InteractiveExposeTemplate, fillDefaultContent: boolean = false): Promise<AxiosResponse> {
        const queryParams = {
            queryParams: {
                fillDefaultContent: String(fillDefaultContent)
            }
        };

        return await this.invokeApi('/templates', 'POST', template, queryParams);
    }

    /**
     * Update a interactive expose template by his id.
     * @param {string} templateId
     * @param {InteractiveExposeTemplate} template
     * @returns {Promise<AxiosResponse>}
     */
    async updateTemplate(templateId: string, template: InteractiveExposeTemplate): Promise<AxiosResponse> {
        return await this.invokeApi(`/templates/${templateId}`, 'PUT', template);
    }

    /**
     * Delete a interactive expose template on the server.
     * @param {string} templateId
     * @returns {Promise<AxiosResponse>}
     */
    async deleteTemplate(templateId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/templates/${templateId}`, 'DELETE');
    }
}

export default new InteractiveExposeService();
