import HttpClient, {APIMapping} from '../http';
import FileModel from "../util/FileModel";
import {AxiosResponse} from "axios";

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

export default class InteractiveExposeService {
    static client = new HttpClient(APIMapping.interactiveExposeService);

    static async getSettings(): Promise<InteractiveExposeSettingsWithLogos> {
        return (await InteractiveExposeService.client.makeRequestSimple({}, '/settings', 'GET')).data;
    }

    static async changeSettings(settings: InteractiveExposeSettings): Promise<InteractiveExposeSettingsWithLogos> {
        return (await InteractiveExposeService.client.makeRequestSimple(settings, '/settings', 'POST')).data;
    }

    static async getPreviewUrl(entityId: string): Promise<string> {
        return (await InteractiveExposeService.client.makeRequestSimple({entityId: entityId}, '/preview', 'POST')).data;
    }

    static async sendInteractiveExpose(recipientId: string, objectId: string, recipientEmailAddress: string): Promise<string> {
        return (await InteractiveExposeService.client.makeRequestSimple({
            recipientId: recipientId,
            objectId: objectId,
            recipientEmailAddress: recipientEmailAddress
        }, '/interactiveExposes', 'POST')).data;
    }

    static async changeLogo(type: 'light' | 'dark', image: File): Promise<FileModel> {
        const formData = new FormData();
        formData.append('logo', image);
        return (await this.client.makeRequest(`/settings/logos/${type}`, 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}})).data;
    }

    /**
     * Get all interactive expose templates.
     * Add a role parameter to filter the templates by the roles.
     *
     * @param {"OFFER" | "REPORT"} role
     * @returns {Promise<AxiosResponse>}
     */
    static async getTemplates(role: 'OFFER' | 'REPORT' | undefined): Promise<AxiosResponse> {
        if(role) {
            return await InteractiveExposeService.client.makeRequest('/templates', 'GET', {}, {
                queryParams: {
                    role: role
                }
            });
        }

        return await InteractiveExposeService.client.makeRequestSimple({}, '/templates', 'GET');
    }

    /**
     * Get a template by his id.
     * @param {string} templateId
     * @returns {Promise<AxiosResponse>}
     */
    static async getTemplateById(templateId: string): Promise<AxiosResponse> {
        return await InteractiveExposeService.client.makeRequestSimple({}, `/templates/${templateId}`, 'GET');
    }

    /**
     * Create a new interactive expose template.
     * @param {InteractiveExposeTemplate} template
     * @param {boolean} fillDefaultContent
     *      true if the content of the template have to be filled with default content
     * @returns {Promise<AxiosResponse>}
     */
    static async createTemplate(template: InteractiveExposeTemplate, fillDefaultContent: boolean = false): Promise<AxiosResponse> {
        const queryParams = {
            queryParams: {
                fillDefaultContent: String(fillDefaultContent)
            }
        };

        return await InteractiveExposeService.client.makeRequest('/templates', 'POST', template, queryParams);
    }

    /**
     * Update a interactive expose template by his id.
     * @param {string} templateId
     * @param {InteractiveExposeTemplate} template
     * @returns {Promise<AxiosResponse>}
     */
    static async updateTemplate(templateId: string, template: InteractiveExposeTemplate): Promise<AxiosResponse> {
        return await InteractiveExposeService.client.makeRequestSimple(template, `/templates/${templateId}`, 'PUT');
    }

    /**
     * Delete a interactive expose template on the server.
     * @param {string} templateId
     * @returns {Promise<AxiosResponse>}
     */
    static async deleteTemplate(templateId: string): Promise<AxiosResponse> {
        return await InteractiveExposeService.client.makeRequestSimple({}, `/templates/${templateId}`, 'DELETE');
    }
}
