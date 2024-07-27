import {app} from "../index";
import request from 'supertest';

describe('Image Processing Endpoint', () => {
    it('should process and return the image', async () => {
        const width = parseInt('100', 10);
        const height = parseInt('100', 10);
        const response = await request(app)
        .get('/image')
        .query({ imageName: 'palmtunnel', width: width, height: height });
      expect(response.status).toBe(200);
    });
});