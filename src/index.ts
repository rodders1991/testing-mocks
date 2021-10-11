import request from 'axios';

export const THIRD_PARTY_API_URL = 'https://testing-things.com/user';

interface User {
    id: string;
    name: string
}

interface RequestParams {
    userId: string;
}

export default async(userIds: Array<string>): Promise<Array<User>> => {
    return await Promise.all(userIds.map(async (userId) => {
        const response = await request.post<RequestParams, User>(THIRD_PARTY_API_URL, {
            userId
        });

        return response.data as User;
    }))
};

