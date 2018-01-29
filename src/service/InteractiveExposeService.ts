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
     */
    async getTemplates(role?: 'OFFER' | 'REPORT'): Promise<AxiosResponse> {
        if (role) {
            return this.invokeApi('/templates', 'GET', {}, {
                queryParams: {
                    role: role
                }
            });
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
     * Create a new interactive expose template.
     * @param template
     * @param fillDefaultContent
     *      true if the content of the template have to be filled with default content
     */
    async createTemplate(template: InteractiveExposeTemplate, fillDefaultContent: boolean = false): Promise<AxiosResponse> {
        const queryParams = {
            queryParams: {
                fillDefaultContent: String(fillDefaultContent)
            }
        };

        return this.invokeApi('/templates', 'POST', template, queryParams);
    }

    /**
     * Update a interactive expose template by his id.
     */
    async updateTemplate(templateId: string, template: InteractiveExposeTemplate): Promise<AxiosResponse> {
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
        return this.invokeApi('/domain', 'POST', '', {queryParams: {domain}});
    }
}

export default new InteractiveExposeService();
