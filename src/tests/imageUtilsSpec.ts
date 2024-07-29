import { processImage, ImageResizeOptions } from "../utils/imageUtils";

describe("processImage", () => {
  it("should return the thumbnail path", async () => {
    const imageName = "fjord";
    const options: ImageResizeOptions = { width: 100, height: 100 };
    const result = await processImage(imageName, options);
    console.log("Thumbnail Path: ", result);
    expect(result).toContain(imageName);
  });
});
