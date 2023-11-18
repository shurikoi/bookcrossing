import sharp from "sharp";

export default async function resizeImage(image: ArrayBuffer, width: number = 400, height: number = 600) {
    const resizedImage = await sharp(image)
        .resize({
            width,
            height,
        })
        .rotate()
        .toBuffer();

    return resizedImage;
}
