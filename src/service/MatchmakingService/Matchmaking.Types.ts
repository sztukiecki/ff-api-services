import { Entity } from '@flowfact/types';

export namespace MatchmakingTypes {

    export interface UpdatedField {
        name: string;
        previousValue: string | number | object | null;
        currentValue: string | number | object | null;
    }

    interface AbstractMatch {
        alreadyOffered: boolean;
        updatedFields: UpdatedField[];
    }

    export interface MatchedEstate extends AbstractMatch {
        estate: Entity;
    }

    export interface MatchedSearchProfile extends AbstractMatch {
        searchProfile: Entity;
    }
}
