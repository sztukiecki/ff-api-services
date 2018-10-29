import { APIClient } from '../http';
import { AxiosResponse } from 'axios';
import APIMapping from '../http/APIMapping';

export class AppointmentBookingService extends APIClient {

	constructor() {
		super(APIMapping.appointmentBookingService);
	}

	getAllObjects(): Promise<AxiosResponse> {
		return this.invokeApi('/objectlist', 'GET');
	}
	getAllEvents(): Promise<AxiosResponse> {
		return this.invokeApi('/eventlist', 'GET');
	}
	addConfig(config: any): Promise<AxiosResponse> {
		return this.invokeApi('/eventconfig', 'POST', config);
	}
	deleteEvent(eventId: any): Promise<AxiosResponse> {
		return this.invokeApi('/eventconfig/delete/event', 'POST', {eventSlotId: eventId});
	}

	getAppointmentRequestData(token: any): Promise<AxiosResponse> {
		return this.invokeApi('/request/?token=' + token, 'GET');
	}
}

export default new AppointmentBookingService();