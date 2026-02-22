import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import * as dogController from '../controllers/dogController';
import { describe, it, expect, vi, beforeEach } from 'vitest';

//testi 4
describe('dogRoutes positive', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.restoreAllMocks();
    app = express();
    app.use('/api/dogs', dogRoutes);
  });
  it('positive dogroutes status success', async () => {
    const mockedResponse = {
      success: true,
      data: {
        imageUrl: 'https://images.dog.ceo/breeds/random-dog.jpg', 
        status: 'success'
      }
    };
    vi.spyOn(dogController, 'getDogImage').mockImplementation(async (_req, res) => {
      res.json(mockedResponse);
    });
    const res = await request(app).get('/api/dogs/random');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('success');
  });
});