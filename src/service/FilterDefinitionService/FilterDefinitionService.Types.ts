import { Flowdsl } from '@flowfact/node-flowdsl';
import { Captions } from '@flowfact/types';

export namespace FilterDefinitionServiceTypes {
    export interface InitialCondition {
        value: any;
        comparisonOperator: string;
    }

    export interface Fields {
        fieldName: string;
        initialConditions?: InitialCondition[];
    }

    export interface FilterDefinition {
        id: string;
        schemaName: string;
        captions: Captions;
        fields: Fields[];
        searchQuery: Flowdsl;
    }
}
