var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AWS from 'ff-aws-sdk';

import WPAPI from 'wpapi';

var WordpressTemplateService = (_temp = _class = function () {
    function WordpressTemplateService() {
        _classCallCheck(this, WordpressTemplateService);
    }

    _createClass(WordpressTemplateService, null, [{
        key: 'init',
        value: function init() {
            // register custom routes
            WordpressTemplateService.wordpressApi.headerFooter = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/beaverbuilder/headerfooter');
        }
    }, {
        key: 'getSiteByPageId',
        value: function getSiteByPageId(pageId) {
            return WordpressTemplateService.wordpressApi.pages().param('userid', AWS.Config.credentials._identityId).id(pageId);
        }

        /**
         * Create a site by an specific name. The page published directly.
         *
         * @param siteName
         */

    }, {
        key: 'createSite',
        value: function createSite(siteName) {
            return WordpressTemplateService.wordpressApi.pages().param('userid', AWS.Config.credentials._identityId).create({
                title: siteName,
                status: 'publish',
                type: 'page'
            });
        }
    }, {
        key: 'deleteSite',
        value: function deleteSite(id) {
            return WordpressTemplateService.wordpressApi.pages().id(id).param('userid', AWS.Config.credentials._identityId).delete();
        }
    }, {
        key: 'getHeaderFooterData',
        value: function getHeaderFooterData() {
            return WordpressTemplateService.wordpressApi.headerFooter().headerfooter();
        }
    }, {
        key: 'updateHeaderFooter',
        value: function updateHeaderFooter(headerId, footerId) {
            WordpressTemplateService.wordpressApi.headerFooter().headerfooter().update({
                headerPageId: headerId,
                footerPageId: footerId
            });
        }
    }]);

    return WordpressTemplateService;
}(), _class.wordpressApi = new WPAPI({
    endpoint: 'http://52.58.125.230/index.php/wp-json',
    username: 'ffAdmin',
    password: 'test'
}), _temp);
export { WordpressTemplateService as default };