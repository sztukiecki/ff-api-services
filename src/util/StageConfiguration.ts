import * as store from "store";
import * as isNode from 'detect-node';

const STORE_KEYS = {
    edgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    edgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

const DEFAULT_STAGE = isNode ? 'development' : 'production';
const DEFAULT_VERSION_TAG = isNode ? 'latest' : 'stable';

let instance: StageConfiguration | null = null;
export class StageConfiguration {
    
    constructor() {
        if(!instance) {
            instance = this;
        }
        return this;
    }
    
    getStageFromStore() {
        return store.get(STORE_KEYS.edgeServiceStage) || DEFAULT_STAGE;
    }

    getVersionTagFromStore() {
        return store.get(STORE_KEYS.edgeServiceVersionTag) || DEFAULT_VERSION_TAG;
    }

    setStageInStore (stage: string) {
        if (stage) {
            store.set(STORE_KEYS.edgeServiceStage, stage);
            console.log('Set stage to: ' + stage);
        }
    }

    setVersionTagInStore = (versionTag: string) => {
        if (versionTag) {
            store.set(STORE_KEYS.edgeServiceVersionTag, versionTag);
            console.log('Set versionTag to: ' + versionTag);
        }
    };

    isDefaultApi() {
        const stage = this.getStageFromStore();
        const versionTag = this.getVersionTagFromStore();
        return (stage === DEFAULT_STAGE) && (versionTag === DEFAULT_VERSION_TAG);
    };
}

export default new StageConfiguration();