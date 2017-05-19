import AWS from 'ff-aws-sdk';

import WPAPI from 'wpapi';

export default class WordpressTemplateService {

    static wordpressApi = new WPAPI({
        endpoint: 'http://52.58.125.230/index.php/wp-json',
        username: 'ffAdmin',
        password: 'test'
    });

    static init() {
        // register custom routes
        WordpressTemplateService.wordpressApi.headerFooter = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/beaverbuilder/headerfooter');
        WordpressTemplateService.wordpressApi.template = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/template');
    }

    static getSiteByPageId(pageId) {
        return WordpressTemplateService.wordpressApi.pages().param('userid', AWS.Config.credentials._identityId).id(pageId);
    }

    /**
     * Create a site by an specific name. The page published directly.
     *
     * @param siteName
     */
    static createSite(siteName) {
        return WordpressTemplateService.wordpressApi.pages().param('userid', AWS.Config.credentials._identityId).create({
            title: siteName,
            status: 'publish',
            type: 'page'
        });
    }

    static deleteSite(id) {
        return WordpressTemplateService.wordpressApi.pages().id(id).param('userid', AWS.Config.credentials._identityId).delete();
    }

    static linkTemplateToSite(pageId, templateId) {
        return WordpressTemplateService.wordpressApi.template()
            .param('userid', this.cognitoId)
            .create({
                templateId: templateId,
                pageId: pageId
            });
    }

    static getHeaderFooterData() {
        return WordpressTemplateService.wordpressApi.headerFooter().headerfooter();
    }

    static updateHeaderFooter(headerId, footerId) {
        WordpressTemplateService.wordpressApi.headerFooter().headerfooter().update({
            headerPageId: headerId,
            footerPageId: footerId
        });
    }
}
