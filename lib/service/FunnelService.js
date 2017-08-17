var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var FunnelService = (_temp = _class = function () {
    function FunnelService() {
        _classCallCheck(this, FunnelService);
    }

    _createClass(FunnelService, null, [{
        key: 'getPossibleTags',


        /**
         * getPossibleTags
         * @param { string } funnelId funnelId
         */
        value: function getPossibleTags(funnelId) {
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/possibletags', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * getKeysForTag
         * @param { string } funnelId funnelId
         * @param { string } tagName tagName
         */

    }, {
        key: 'getKeysForTag',
        value: function getKeysForTag(funnelId, tagName) {
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/tags/' + tagName + '/metadata/keys', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * getValuesForTagKey
         * @param { string } funnelId funnelId
         * @param { string } tagName tagName
         * @param { string } metadataKey metadataKey
         */

    }, {
        key: 'getValuesForTagKey',
        value: function getValuesForTagKey(funnelId, tagName, metadataKey) {
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/tags/' + tagName + '/metadata/keys/' + metadataKey + '/values', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * getFunnelStatistics
         * @param { string } funnelId funnelId
         */

    }, {
        key: 'getFunnelStatistics',
        value: function getFunnelStatistics(funnelId) {
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/statistics', 'GET').then(function (s) {
                return s.data;
            });
        }

        /**
         * getFunnelStageEntities
         * @param { string } funnelId funnelId
         * @param { string } stageId stageId
         * @param { number } page page
         * @param { number} size size
         */

    }, {
        key: 'getFunnelStageEntities',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(funnelId, stageId) {
                var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
                var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return FunnelService.client.makeRequestSimple({ page: page, size: size }, '/funnels/' + funnelId + '/stage/' + stageId + '/entities', 'GET');

                            case 2:
                                return _context.abrupt('return', _context.sent.data);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getFunnelStageEntities(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return getFunnelStageEntities;
        }()

        /**
         * createFunnel
         * @param { object } funnelToCreate funnelToCreate
         */

    }, {
        key: 'createFunnel',
        value: function createFunnel(funnelToCreate) {
            return FunnelService.client.makeRequestSimple(funnelToCreate || {}, '/funnels', 'POST').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId, 'GET').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId, 'DELETE').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/stages', 'GET').then(function (s) {
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
            return FunnelService.client.makeRequestSimple(stage || {}, '/funnels/' + funnelId + '/stages', 'POST').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/stages/' + stageId, 'GET').then(function (s) {
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
            return FunnelService.client.makeRequestSimple(stage, '/funnels/' + funnelId + '/stages/' + stageId, 'POST').then(function (s) {
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
            return FunnelService.client.makeRequestSimple(stage, '/funnels/' + funnelId + '/stages/' + stageId, 'PUT').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/stages/' + stageId, 'DELETE').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/state', 'GET').then(function (s) {
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
            return FunnelService.client.makeRequestSimple(state || {}, '/funnels/' + funnelId + '/state', 'POST').then(function (s) {
                return s.data;
            });
        }

        /**
         * getAllActions
         */

    }, {
        key: 'getAllActions',
        value: function getAllActions() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'automatic';

            return FunnelService.client.makeRequestSimple({}, '/funnels/actions/?type=' + type, 'GET').then(function (s) {
                return s.data;
            });
        }
        /*
         * executeActionForEntity
         */

    }, {
        key: 'executeActionForEntity',
        value: function executeActionForEntity(action, schemaId, entityId) {
            return FunnelService.client.makeRequestSimple(action, '/funnels/actions/execute/schemas/' + schemaId + '/entityId/' + entityId, 'POST');
        }
        /**
         * getDashboardInformation
         * @param { object } state state
         */

    }, {
        key: 'getDashboardInformation',
        value: function getDashboardInformation(state) {
            if (state) {
                return FunnelService.client.makeRequest({}, '/funnels/dashboard', 'GET', undefined, { queryParams: { state: state } }).then(function (s) {
                    return s.data.dashboardFunnels;
                });
            }
            return FunnelService.client.makeRequestSimple({}, '/funnels/dashboard', 'GET').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/availableEntryConditions/' + schemaId, 'GET').then(function (s) {
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
            return FunnelService.client.makeRequestSimple({}, '/funnels/' + funnelId + '/stages/' + stageId + '/availableEntryConditions', 'GET').then(function (s) {
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
            return FunnelService.client.makeRequest({}, '/funnels/' + funnelId, 'PUT', data);
        }
    }, {
        key: 'setStageAsFirstStage',
        value: function setStageAsFirstStage(funnelId, stageId) {
            return FunnelService.client.makeRequest({}, '/funnels/' + funnelId + '/stages/' + stageId + '/parent', 'PUT');
        }
    }, {
        key: 'setStageAfterStage',
        value: function setStageAfterStage(funnelId, stageId, parentId) {
            return FunnelService.client.makeRequest({}, '/funnels/' + funnelId + '/stages/' + stageId + '/parent/' + parentId, 'PUT');
        }
    }]);

    return FunnelService;
}(), _class.client = new HttpClient(APIMapping.funnelService), _temp);
export { FunnelService as default };