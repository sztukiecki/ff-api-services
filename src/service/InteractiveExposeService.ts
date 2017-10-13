import HttpClient, {APIMapping} from '../http';

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
        }, '/preview', 'POST')).data;
    }

}
