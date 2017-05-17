import WPAPI from 'wpapi';

export default class WordpressTemplateService {

    cognitoId = undefined;

    constructor(cognitoId) {
        if(!cognitoId) {
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

    getSiteByPageId(pageId) {
        return this.wordpressApi.pages().param('userid', this.cognitoId).id(pageId);
    }

    /**
     * Create a site by an specific name. The page published directly.
     *
     * @param siteName
     */
    createSite(siteName) {
        return this.wordpressApi.pages().param('userid', this.cognitoId).create({
            title: siteName,
            status: 'publish',
            type: 'page'
        });
    }

    deleteSite(id) {
        return this.wordpressApi.pages().id(id).param('userid', this.cognitoId).delete();
    }

    getHeaderFooterData() {
        return this.wordpressApi.headerFooter().headerfooter();
    }

    updateHeaderFooter(headerId, footerId) {
        this.wordpressApi.headerFooter().headerfooter().update({
            headerPageId: headerId,
            footerPageId: footerId
        });
    }
}
