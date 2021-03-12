import {GeoLocationController} from "./GeoLocationController";
import {GeoPolygonController} from "./GeoPolygonController";
import {PolygonEntityLinkController} from "./PolygonEntityLinkController";
import {SearchController} from "./SearchController";

export * from './GeoInformationService.Types';

export class GeoInformationService {
    public static instance = new GeoInformationService();

    public readonly geoLocation: GeoLocationController;
    public readonly geoPolygon: GeoPolygonController;
    public readonly polygonEntityLink: PolygonEntityLinkController;
    public readonly search: SearchController;

    constructor() {
        this.geoLocation = new GeoLocationController();
        this.geoPolygon = new GeoPolygonController();
        this.polygonEntityLink = new PolygonEntityLinkController();
        this.search = new SearchController();
    }
}

export const GeoInformationServiceInstance = new GeoInformationService();
