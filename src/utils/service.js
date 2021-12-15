import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
}

export const Patterns = {
    password: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$')
}