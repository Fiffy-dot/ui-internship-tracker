import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    apiBaseUrl: "http://localhost:8000",
}

export const Patterns = {
    password: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$')
}