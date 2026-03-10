import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

// testi 3
describe('dogController - positive', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); 
  });

  it('success ja mocked json', async () => {
    const mockedDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };
    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockedDogData);
    const req: any = {};
    const res: any = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    };
    await getDogImage(req, res);
    expect(dogService.getRandomDogImage).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedDogData
    });
  });
});

