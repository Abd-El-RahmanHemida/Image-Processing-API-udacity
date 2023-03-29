import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('test  endpoints', (): void => {
    it('test  endpoint /', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/');

        expect(response.status).toBe(200);
    });
    it('test  endpoint /api/images', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/api/images');

        expect(response.status).toBe(200);
    });
});
