import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { processImage, ImageResizeOptions, imagesDir, thumbsDir } from '../utils/imageUtils';

describe('processImage', () => {
  it('should return the thumbnail path if it exists', async () => {
    const imageName = 'fjord.jpg';
    const options: ImageResizeOptions = { width: 100, height: 100 };
    const result = await processImage(imageName, options);
    expect(result).toContain(imageName);
  });
});