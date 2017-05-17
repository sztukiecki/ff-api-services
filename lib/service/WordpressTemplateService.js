var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import WPAPI from 'wpapi';

var WordpressTemplateService = function () {
    function WordpressTemplateService(cognitoId) {
        _classCallCheck(this, WordpressTemplateService);

        this.cognitoId = undefined;

        if (!cognitoId) {
            console.error('Do not init the WordpressTemplateService with an unknown cognitoId!');
        }
        this.cognitoId = cognitoId;

        this.wordpressApi = new WPAPI({
            endpoint: 'http://52.58.125.230/index.php/wp-json',
            username: 'ffAdmin',
            password: 'test'
        });
        // register custom routes
        this.wordpressApi.headerFooter = this.wordpressApi.registerRoute('flowfact/v1', '/beaverbuilder/headerfooter');
    }

    _createClass(WordpressTemplateService, [{
        key: 'getSiteByPageId',
        value: function getSiteByPageId(pageId) {
            return this.wordpressApi.pages().param('userid', this.cognitoId).id(pageId);
        }

        /**
         * Create a site by an specific name. The page published directly.
         *
         * @param siteName
         */

    }, {
        key: 'createSite',
        value: function createSite(siteName) {
            return this.wordpressApi.pages().param('userid', this.cognitoId).create({
                title: siteName,
                status: 'publish',
                type: 'page'
            });
        }
    }, {
        key: 'deleteSite',
        value: function deleteSite(id) {
            return this.wordpressApi.pages().id(id).param('userid', this.cognitoId).delete();
        }
    }, {
        key: 'getHeaderFooterData',
        value: function getHeaderFooterData() {
            return this.wordpressApi.headerFooter().headerfooter();
        }
    }, {
        key: 'updateHeaderFooter',
        value: function updateHeaderFooter(headerId, footerId) {
            this.wordpressApi.headerFooter().headerfooter().update({
                headerPageId: headerId,
                footerPageId: footerId
            });
        }
    }]);

    return WordpressTemplateService;
}();

export { WordpressTemplateService as default };