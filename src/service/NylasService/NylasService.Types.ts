/**
 * There Might be even more Unknown Options. This Model comes directly from Nylas and it is not documented.
 * If a documentation for it will be added we can specify this model even further, potentially ANYTHING may be
 * possible here...
 */

export namespace NylasServiceTypes {
    export interface SchedulerPage {
        slug: string;
        config: PageConfig;
        access_tokens: string[];
        app_client_id: string;
        created_at: string;
        edit_token: string;
        id: number;
        modified_at: string;
        name: string;
    }

    export interface PageConfig {
        calendar_ids: object;
        timezone: string;
        event: ConfigEvent;
        appearance: ConfigAppearance;
        reminders: any[];
        booking: ConfigBooking;
    }

    export interface ConfigEvent {
        duration: number;
        location: string;
        title: string;
    }

    export interface ConfigAppearance {
        color: string;
        company_name: string;
        submit_text: string;
        show_nylas_branding: boolean;
        logo: string;
    }

    export interface ConfigBooking {
        additional_fields: any[];
        available_days_in_future: number;
        confirmation_method: string;
        min_booking_notice: number;
        min_buffer: number;
        min_cancellation_notice: number;
        opening_hours: BookingOpeningHours[];
        scheduling_method: string;
    }

    export interface BookingOpeningHours {
        days: string[];
        start: string;
        end: string;
    }
}
