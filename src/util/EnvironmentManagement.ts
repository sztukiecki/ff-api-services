import * as store from 'store';
import * as isNode from 'detect-node';

const StoreKeys = {
    edgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    edgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

enum StageTypes {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
    LOCAL = 'local'
}

enum VersionTagTypes {
    LATEST = 'latest',
    STABLE = 'stable'
}

const defaultStage = isNode ? StageTypes.DEVELOPMENT : StageTypes.PRODUCTION;
const defaultVersionTag = isNode ? VersionTagTypes.LATEST : VersionTagTypes.STABLE;

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

    isDefaultApi() {
        return (this.getStage() === defaultStage) && (this.getVersionTag() === defaultVersionTag);
    }
}

export default new EnvironmentManagement();
export {
    StoreKeys,
    VersionTagTypes,
    StageTypes
};
