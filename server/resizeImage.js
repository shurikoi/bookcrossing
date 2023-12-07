const sharp = require("sharp");

module.exports = async function resizeImage(image, width = 700, height) {
  const resizedImage = await sharp(image)
    .resize({
      width,
      height,
    })
    .withMetadata()
    .toBuffer();

  return resizedImage;
}
