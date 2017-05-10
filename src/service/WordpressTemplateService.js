import WPAPI from 'wpapi';

export default class WordpressTemplateService {

    constructor() {
        this.wordpressApi = new WPAPI({
            endpoint: 'http://52.58.125.230/index.php/wp-json',
            username: 'ffAdmin',
            password: 'test'
        });
        // register custom routes
        this.wordpressApi.headerFooter = this.wordpressApi.registerRoute('flowfact/v1', '/beaverbuilder/headerfooter');
    }

    getSitesByPageId(pageId) {
        return this.wordpressApi.pages().id(pageId);
    }

    /**
     * Create a site by an specific name. The page published directly.
     *
     * @param siteName
     */
    createSite(siteName) {
        return this.wordpressApi.pages().create({
            title: siteName,
            status: 'publish',
            type: 'page'
        });
    }

    delete(id) {
        return this.wordpressApi.pages().id(id).delete();
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
