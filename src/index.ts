import path from 'path';
import express from 'express';
import { ImageResizeOptions, processImage } from './utils/imageUtils';


export const app = express();
const port = 3000;

app.get('/image', async (req, res) => {
    const imageName: string = 'fjord'; //req.query.imageName as string;
    const width: number = parseInt(req.query.width as string, 10);
    const height: number = parseInt(req.query.height as string, 10);
  
    
    // ... error handling for missing or invalid parameters
  
    const options: ImageResizeOptions = { width, height };
    console.log(imageName, options);
    try {
      res.sendFile(path.join('./thumbs', await processImage(imageName, options)));
      // Serve the image from the thumbPath
    } catch (error) {
      // Handle errors
      res.status(500).send('Error processing image');
      console.error(error);
    }
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));