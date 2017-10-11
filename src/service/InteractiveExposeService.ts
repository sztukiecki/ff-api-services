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
}
