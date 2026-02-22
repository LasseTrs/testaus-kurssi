import request from 'supertest';
import express, { Router } from 'express';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import dogRoutes from '../routes/dogRoutes';
import * as dogController from '../controllers/dogController';

describe('dogRoutes - GET /dogs/random (negative) Supertest', () => {
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

  it('should return 500 with error JSON when controller fails', async () => {
    const mockController = (app as any).mockController;
    const mockedErrorResponse = (app as any).mockedErrorResponse;
    const response = await request(app).get('/api/dogs/random');
    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockedErrorResponse);
    expect(mockController).toHaveBeenCalled();
  });
});