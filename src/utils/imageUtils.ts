import {promises as fs} from 'fs';
import path from 'path';
import sharp from 'sharp';  //image processing


export const imagesDir = ('./images');
export const thumbsDir = ('./thumbs');

export interface ImageResizeOptions {
    width: number;
    height: number;
}

export async function processImage(imageName: string, options: ImageResizeOptions): Promise<string> {
    try {
        const originalImagePath = path.join(imagesDir, `${imageName}.jpg`);
        const thumbImagePath = path.join(thumbsDir, `${imageName}-${options.width}x${options.height}.jpg`);
    
        if (await fs.access(thumbImagePath).then(() => true).catch(() => false)) {
            return thumbImagePath;
        } else {
            const image = await sharp(originalImagePath)
                .resize(options)
                .toFormat('jpg')
                .toBuffer();

            await fs.writeFile(thumbImagePath, image);
            return thumbImagePath;
        }
    } catch (error) {
        console.error('Error processing image: ', error);
        throw error;
    }
}
