import { CreateUser, LoginUser } from '@/app/api/auth/schema';
import axios from 'axios';

export const registerUserReq = async (user: CreateUser) => axios.post('/api/auth/register', user);

export const loginUserReq = async (user: LoginUser) => axios.post('/api/auth/login', user);

export const checkUserReq = async () => axios.get('/api/auth/check', { withCredentials: true });

export const logoutUserReq = async () => axios.post('/api/auth/logout', {}, { withCredentials: true });