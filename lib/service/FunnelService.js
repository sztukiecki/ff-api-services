var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var FunnelService = function () {
    function FunnelService() {
        _classCallCheck(this, FunnelService);

        this.client = new HttpClient(APIMapping.funnelService);
    }

    _createClass(FunnelService, [{
        key: 'getFunnelStatistics',
        value: function getFunnelStatistics(funnelId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId + '/statistics', 'GET').then(function (s) {
                return s.data;
            });
        }
        /**
         * createFunnel
         * @param { object } funnelToCreate funnelToCreate
         */

    }, {
        key: 'createFunnel',
        value: function createFunnel(funnelToCreate) {
            return this.client.makeRequetSimple(funnelToCreate || {}, '/funnels', 'POST').then(function (s) {
                return s.data;
            });
        }

        /**
         * findFunnelById
         * @param { string } funnelId funnelId
         */

    }, {
        key: 'findFunnelById',
        value: function findFunnelById(funnelId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId, 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * deleteFunnelById
         * @param { string } funnelId funnelId
         */

    }, {
        key: 'deleteFunnelById',
        value: function deleteFunnelById(funnelId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId, 'DELETE').then(function (s) {
                return s.data;
            });
        }

        /**
         * getAllStagesOfAnFunnel
         * @param { string } funnelId funnelId
         */

    }, {
        key: 'getAllStagesOfAnFunnel',
        value: function getAllStagesOfAnFunnel(funnelId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId + '/stages', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * addStageAtTheEndOfTheFunnel
         * @param { string } funnelId funnelId
         * @param { object } stage stage
         */

    }, {
        key: 'addStageAtTheEndOfTheFunnel',
        value: function addStageAtTheEndOfTheFunnel(funnelId, stage) {
            return this.client.makeRequetSimple(stage || {}, '/funnels/' + funnelId + '/stages', 'POST').then(function (s) {
                return s.data;
            });
        }

        /**
         * getAStagesOfAFunnel
         * @param { string } funnelId funnelId
         * @param { string } stageId stageId
         */

    }, {
        key: 'findStageById',
        value: function findStageById(funnelId, stageId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId + '/stages/' + stageId, 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * addStageAfterGivenStageOfGivenFunnel
         * @param { string } funnelId funnelId
         * @param { string } stageId stageId
         * @param { object } stage stage
         */

    }, {
        key: 'addStageAfterGivenStageOfGivenFunnel',
        value: function addStageAfterGivenStageOfGivenFunnel(funnelId, stageId, stage) {
            return this.client.makeRequetSimple(stage, '/funnels/' + funnelId + '/stages/' + stageId, 'POST').then(function (s) {
                return s.data;
            });
        }

        /**
         * changeAStagesOfAFunnel
         * @param { string } funnelId funnelId
         * @param { string } stageId stageId
         * @param { object } stage stage
         */

    }, {
        key: 'changeAStagesOfAFunnel',
        value: function changeAStagesOfAFunnel(funnelId, stageId, stage) {
            return this.client.makeRequetSimple(stage, '/funnels/' + funnelId + '/stages/' + stageId, 'PUT').then(function (s) {
                return s.data;
            });
        }

        /**
         * deleteStageFromFunnel
         * @param { string } funnelId funnelId
         * @param { string } stageId stageId
         */

    }, {
        key: 'deleteStageFromFunnel',
        value: function deleteStageFromFunnel(funnelId, stageId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId + '/stages/' + stageId, 'DELETE').then(function (s) {
                return s.data;
            });
        }

        /**
         * getStateOfTheFunnel
         * @param { string } funnelId funnelId
         */

    }, {
        key: 'getStateOfTheFunnel',
        value: function getStateOfTheFunnel(funnelId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId + '/state', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * changeStateOfTheFunnel
         * @param { string } funnelId funnelId
         * @param { object } state state
         */

    }, {
        key: 'changeStateOfTheFunnel',
        value: function changeStateOfTheFunnel(funnelId, state) {
            return this.client.makeRequetSimple(state || {}, '/funnels/' + funnelId + '/state', 'POST').then(function (s) {
                return s.data;
            });
        }

        /**
         * getAllActions
         */

    }, {
        key: 'getAllActions',
        value: function getAllActions() {
            return this.client.makeRequetSimple({}, '/funnels/actions', 'GET').then(function (s) {
                return s.data.actionList;
            });
        }

        /**
         * getDashboardInformation
         * @param { object } state state
         */

    }, {
        key: 'getDashboardInformation',
        value: function getDashboardInformation(state) {
            if (state) {
                return this.client.makeRequest({}, '/funnels/dashboard', 'GET', undefined, { queryParams: { state: state } }).then(function (s) {
                    return s.data.dashboardFunnels;
                });
            }
            return this.client.makeRequetSimple({}, '/funnels/dashboard', 'GET').then(function (s) {
                return s.data.dashboardFunnels;
            });
        }

        /**
         * getAvailableEntryConditionsForSchema
         * @param { object } state state
         */

    }, {
        key: 'getAvailableEntryConditionsForSchema',
        value: function getAvailableEntryConditionsForSchema(schemaId) {
            return this.client.makeRequetSimple({}, '/availableEntryConditions/' + schemaId, 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * getAvailableEntryConditionsForPrevStage
         * @param { object } state state
         */

    }, {
        key: 'getAvailableEntryConditionsForPrevStage',
        value: function getAvailableEntryConditionsForPrevStage(funnelId, stageId) {
            return this.client.makeRequetSimple({}, '/funnels/' + funnelId + '/stages/' + stageId + '/availableEntryConditions', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * updateFunnelById
         * @param funnelId
         *      The id of the funnel
         * @param data
         *      The model of the funnel as object
         */

    }, {
        key: 'updateFunnelById',
        value: function updateFunnelById(funnelId, data) {
            return this.client.makeRequest({}, '/funnels/' + funnelId, 'PUT', data);
        }
    }, {
        key: 'setStageAsFirstStage',
        value: function setStageAsFirstStage(funnelId, stageId) {
            return this.client.makeRequest({}, '/funnels/' + funnelId + '/stages/' + stageId + '/parent', 'PUT');
        }
    }, {
        key: 'setStageAfterStage',
        value: function setStageAfterStage(funnelId, stageId, parentId) {
            return this.client.makeRequest({}, '/funnels/' + funnelId + '/stages/' + stageId + '/parent/' + parentId, 'PUT');
        }
    }]);

    return FunnelService;
}();

export { FunnelService as default };