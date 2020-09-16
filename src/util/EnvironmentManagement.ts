import * as store from 'store';
import * as isNode from 'detect-node';

const StoreKeys = {
    edgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    edgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG',
};

enum StageTypes {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
    LOCAL = 'local',
}

enum VersionTagTypes {
    LATEST = 'latest',
    STABLE = 'stable',
}

const defaultStage = isNode ? process.env.STAGE_NAME || StageTypes.DEVELOPMENT : StageTypes.PRODUCTION;
const defaultVersionTag = defaultStage === StageTypes.PRODUCTION ? VersionTagTypes.STABLE : VersionTagTypes.LATEST;

let instance: EnvironmentManagement | null = null;

export class EnvironmentManagement {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return this;
    }

    // noinspection JSMethodCanBeStatic
    getStage(): StageTypes {
        return store.get(StoreKeys.edgeServiceStage) || defaultStage;
    }

    // noinspection JSMethodCanBeStatic
    getVersionTag(): VersionTagTypes {
        return store.get(StoreKeys.edgeServiceVersionTag) || defaultVersionTag;
    }

    // noinspection JSMethodCanBeStatic
    setStage(stage: StageTypes) {
        if (stage) {
            store.set(StoreKeys.edgeServiceStage, stage);
        }
    }

    setVersionTag(versionTag: VersionTagTypes) {
        if (versionTag) {
            store.set(StoreKeys.edgeServiceVersionTag, versionTag);
        }
    }

    getBaseUrl = (internal = false) => {
        const stage = this.getStage();
        const account = stage === StageTypes.DEVELOPMENT ? 'flowfact-dev' : 'flowfact-prod';
        if (stage === StageTypes.LOCAL) {
            return 'http://localhost:8080';
        }
        if (internal) {
            return `https://router-vs.${stage}.cloudios.internal.${account}.cloud`;
        }
        return `https://api.${stage}.cloudios.${account}.cloud`;
    };

    isDefaultApi() {
        return this.getStage() === defaultStage && this.getVersionTag() === defaultVersionTag;
    }
}

const EnvironmentManagementInstance = new EnvironmentManagement();

export { StoreKeys, VersionTagTypes, StageTypes, EnvironmentManagementInstance };
