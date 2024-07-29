import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export const imagesDir = path.join(__dirname, "../../images");
export const thumbsDir = path.join(__dirname, "../../thumbs");

export interface ImageResizeOptions {
  width: number;
  height: number;
}

export async function processImage(
  imageName: string,
  options: ImageResizeOptions,
): Promise<string> {
  path.join(thumbsDir, `${imageName}-${options.width}x${options.height}.jpg`);
  const originalImagePath = path.join(imagesDir, `${imageName}.jpg`);
  const thumbImagePath = path.join(
    thumbsDir,
    `${imageName}-${options.width}x${options.height}.jpg`,
  );

  try {
    // Thumbnail exists
    await fs.access(thumbImagePath, fs.constants.F_OK).then(() => {});
    return thumbImagePath;
  } catch (error) {
    console.error("Thumbnail not found:", error);

    try {
      const image = sharp(originalImagePath);
      image.resize(options).toFormat("jpg").toBuffer().then();
      await fs.writeFile(thumbImagePath, image).then();
      return thumbImagePath; // Thumbnail created successfully
    } catch (error) {
      console.error("Error processing image:", error);
      throw error; // Rethrow the error
    }
  }
}
