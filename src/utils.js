import process from "process";

const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const SITE_URL = isDev() ? 'localhost:3000' : 'https://geogra.me/';

export const USERS_COLLECTION = 'users';
export const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAq-bT8CcgFTuTQZjkjLCRFSawl4k9jJ_Q&libraries=geometry,drawing,places';