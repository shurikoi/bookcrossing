interface resizeImageProps {
  image: File | string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  callback?: ({ url, data }: callbackProps) => any;
}

interface callbackProps {
  url: string;
  data: Blob;
}

export default function cutImage({ image, startX, startY, endX, endY, callback }: resizeImageProps) {
  let url: string | undefined;

  const HTMLImage = new Image();

  const HTMLCanvas = document.createElement("canvas");

  const ctx = HTMLCanvas.getContext("2d");

  HTMLImage.onload = (e) => {
    HTMLCanvas.width = HTMLCanvas.height = 500;

    ctx?.drawImage(HTMLImage, startX, startY, endX - startX, endY - startY, 0, 0, HTMLCanvas.width, HTMLCanvas.height);

    HTMLCanvas.toBlob(
      (blob) => {
        if (blob) {
          url = URL.createObjectURL(blob);

          if (callback) callback({ url, data: blob });
        }
      },
      typeof image == "string" ? "image/jpeg" : image.type,
      100
    );
  };

  HTMLImage.src = typeof image == "string" ? image : URL.createObjectURL(image);
}
