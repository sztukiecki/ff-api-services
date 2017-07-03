"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ff_aws_sdk_1 = require("ff-aws-sdk");
var store_1 = require("store");
var wpapi_1 = require("wpapi");
var WordpressTemplateService = (function () {
    function WordpressTemplateService() {
    }
    WordpressTemplateService.init = function () {
        var stage = store_1.default.get(this.storeKeys.StageName), versionTag = store_1.default.get(this.storeKeys.VersionTagName);
        stage = stage ? stage : this.defaultStage;
        // There is no concept on how to implement the version into the beaverbuilder right now.
        // Technically both versions are already implemented
        versionTag = versionTag ? versionTag : this.defaultVersionTag;
        this.wordpressUrl = 'https://templatingengine.' + stage + '.flowfact.cloud/';
        this.cognitoToken = null;
        if (ff_aws_sdk_1.default.Config.credentials && ff_aws_sdk_1.default.Config.credentials.params && ff_aws_sdk_1.default.Config.credentials.params.Logins) {
            var loginKeys = Object.keys(ff_aws_sdk_1.default.Config.credentials.params.Logins);
            if (loginKeys.length > 0) {
                this.cognitoToken = ff_aws_sdk_1.default.Config.credentials.params.Logins[loginKeys[0]];
            }
        }
    };
    WordpressTemplateService.getPageUrl = function (templateId, companyId) {
        return WordpressTemplateService.wordpressUrl + companyId + '/' + templateId;
    };
    /**
     * Create a site by a specific name. The page is published directly.
     *
     * @param companyId 	The company of the current user scope, which is also the blog name for the wordpress api
     * @param pageTitle 	The title of the new WordPress page
     * @param templateId	The id of the template, which will be the title of the page aswell.
     *
     */
    WordpressTemplateService.createPage = function (companyId, pageTitle, templateId) {
        if (this.cognitoToken) {
            var wordpressApi = this.getWordpressApi(companyId);
            return wordpressApi.pages().param('cognitoToken', this.cognitoToken).create({
                title: pageTitle,
                slug: templateId,
                status: 'publish',
                type: 'page'
            });
        }
        return false;
    };
    /**
     * Delete a site with a specific name.
     *
     * @param companyId 	The company of the current user scope, which is also the blog name for the wordpress api
     * @param templateId 	The slug of the WordPress page
     *
     */
    WordpressTemplateService.deletePage = function (companyId, templateId) {
        var _this = this;
        if (this.cognitoToken) {
            var wordpressApi_1 = this.getWordpressApi(companyId);
            return wordpressApi_1.pages().slug(templateId).param('cognitoToken', this.cognitoToken).then(function (page) {
                if (page.length > 0) {
                    page = page.shift();
                    return wordpressApi_1.pages().id(page.id).param('cognitoToken', _this.cognitoToken).delete();
                }
                return false;
            });
        }
        return false;
    };
    /**
     * Generates the blog specific WordPress API enpoints and returns them
     *
     * @param companyId The company of the current user scope, which is also the blog name for the wordpress api
     * @returns {WPAPI}
     */
    WordpressTemplateService.getWordpressApi = function (companyId) {
        if (!(companyId in this.wordpressApis)) {
            this.wordpressApis[companyId] = new wpapi_1.default({
                endpoint: "" + this.wordpressUrl + companyId + "/index.php/wp-json"
            });
        }
        return this.wordpressApis[companyId];
    };
    WordpressTemplateService.storeKeys = {
        StageName: 'HTTPCLIENT.APICLIENT.STAGE',
        VersionTagName: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
    };
    WordpressTemplateService.defaultStage = 'staging';
    WordpressTemplateService.defaultVersionTag = 'stable';
    WordpressTemplateService.wordpressApis = [];
    return WordpressTemplateService;
}());
exports.default = WordpressTemplateService;
//# sourceMappingURL=WordpressTemplateService.js.map