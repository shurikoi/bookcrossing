import sharp from "sharp";

export default async function resizeImage(image: ArrayBuffer, width: number = 700, height: number | undefined = undefined) {
  const resizedImage = await sharp(image)
    .resize({
      width,
      height,
    })
    .rotate()
    .toBuffer();

  return resizedImage;
}
