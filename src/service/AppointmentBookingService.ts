import { APIClient } from '../http';
import { AxiosResponse } from 'axios';
import APIMapping from '../http/APIMapping';
// This class provides methods that grant access to the appointment-booking-service. All methods Return AxiosPromises
// that represent the answer that the appointment-booking-service provided.
export class AppointmentBookingService extends APIClient {

    constructor() {
        super(APIMapping.appointmentBookingService);
    }

    // fetches All objects from the current user.
    getAllObjects(): Promise<AxiosResponse> {
        return this.invokeApi('/objectlist', 'GET');
    }
    // fetches All Events (possible and existing)
    getAllEvents(): Promise<AxiosResponse> {
        return this.invokeApi('/eventlist', 'GET');
    }
    // posts the provided config against the service. New eventslots will be created)
    addConfig(config: any): Promise<AxiosResponse> {
        return this.invokeApi('/eventconfig', 'POST', config);
    }
    // Posts the eventId against the service. This event will be deleted.
    deleteEvent(eventId: any): Promise<AxiosResponse> {
        return this.invokeApi('/eventconfig/delete/event', 'POST', {eventSlotId: eventId});
    }

    // This Get ressource returns all information needed for the view to display the prospect-booking-views
    getAppointmentRequestData(token: any): Promise<AxiosResponse> {
        return this.invokeApi('/public/request/' + token, 'GET');
    }

    // This method posts the given appointment against the service. The appointment will be created.
    bookAppointment(token: any, appointment: any): Promise<AxiosResponse> {
        return this.invokeApi('/public/request/' + token, 'POST', appointment);
    }
}

export default new AppointmentBookingService();