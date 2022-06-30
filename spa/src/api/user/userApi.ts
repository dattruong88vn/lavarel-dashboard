import client from '../client';
import UserAliveModel from '../../model/UserAliveModel';

export const isSessionAlive = async (): Promise<UserAliveModel> => {
    return await client.getDirectly(`/is-session-alive`);
};

export const getCurrentUser = async (): Promise<any> => {
    return await client.getDirectly(`/spa/getCurrentUser`);
};

