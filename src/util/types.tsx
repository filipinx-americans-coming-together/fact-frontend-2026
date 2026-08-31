export interface ResponseData<T> {
    fields: T;
    model: string;
    pk: number;
}

export interface NotificationData {
    id: number;
    message: string;
    expiration: Date;
}

export interface AgendaItemData {
    id: number;
    title: string;
    start_time: Date;
    end_time: Date;
    building: string | undefined;
    room_num: string | undefined;
    session_num: number | undefined;
}

export interface UserResponse {
    delegate: ResponseData<DelegateData>[];
    registration: ResponseData<RegistrationData>[];
    user: ResponseData<UserData>[];
}

export interface WorkshopResponse {
    workshop: ResponseData<WorkshopData>[];
    location: ResponseData<LocationData>[];
}

export interface SchoolData {
    id: number;
    name: string;
}

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface DelegateData {
    id: number;
    pronouns: string;
    year: string;
    school: number;
}

export interface WorkshopData {
    id: number;
    session: number;
    title: string;
    facilitators: string[] | null;
    registrationCount : number;
    description: string;
    location: number;
}

export interface RegistrationData {
    delegate: number;
    workshop: number;
}

export interface LocationData {
    id: number;
    room_num: string;
    building: string;
    capacity: number;
    session: number;
}

export interface FacilitatorData {
    id: number;
    department_name: string;
    facilitator_names: string[];
    image_url: string;
    position: string;
    bio: string;
    attending_networking_session: boolean;
}

export interface FacilitatorRegistrationData {
    facilitator_name: string;
    workshop: number;
}

export interface FacilitatorWorkshopData {
    facilitator: number;
    workshop: number;
}

export interface FacilitatorResponse {
    facilitator: ResponseData<FacilitatorData>[];
    registrations: ResponseData<FacilitatorRegistrationData>[];
    workshops: ResponseData<FacilitatorWorkshopData>[];
}
