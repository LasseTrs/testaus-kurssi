import request from 'supertest';
import express, { Router } from 'express';
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

describe('dogRoutes negative ja error', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.restoreAllMocks();
    app = express();
    const mockedErrorResponse = {
      success: false,
      error: 'Failed to fetch dog image: Network error'
    };

    const mockController = vi.fn(async (_req, res) => {
      res.status(500).json(mockedErrorResponse);
    });
    const mockRouter = Router();
    mockRouter.get('/random', mockController);
    app.use('/api/dogs', mockRouter);
    (app as any).mockController = mockController;
    (app as any).mockedErrorResponse = mockedErrorResponse;
  });

  it('negative ja error ', async () => {
    const mockController = (app as any).mockController;
    const mockedErrorResponse = (app as any).mockedErrorResponse;
    const response = await request(app).get('/api/dogs/random');
    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockedErrorResponse);
    expect(mockController).toHaveBeenCalled();
  });
});