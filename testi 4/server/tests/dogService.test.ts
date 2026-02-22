import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

//testi 1
describe('dogService - getRandomDogImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('success ja image', async () => {
    const mockedApiResponse = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockedApiResponse)
    } as any));
    const result = await getRandomDogImage();
    expect(result).toEqual({
      imageUrl: mockedApiResponse.message,
      status: 'success'
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

//testi 2
describe('dogService - getRandomDogImage (negative)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('false ja status 500', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn() 
    } as any));
    await expect(getRandomDogImage()).rejects.toThrow('Dog API returned status 500');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});