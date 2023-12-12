interface resizeImageProps {
  file: File;
  aspectRatio?: number;
  width?: number;
  height?: number;
  callback?: ({ url, data }: callbackProps) => any;
}

interface callbackProps {
  url: string;
  data: Blob;
}

export default function resizeImage({ file, width = 700, height, callback }: resizeImageProps) {
  let url: string | undefined;

  const HTMLImage = new Image();

  const HTMLCanvas = document.createElement("canvas");

  const ctx = HTMLCanvas.getContext("2d");

  HTMLImage.onload = (e) => {
    const scale = width / HTMLImage.width;

    HTMLCanvas.width = width;
    HTMLCanvas.height = HTMLImage.height * scale;

    ctx?.drawImage(HTMLImage, 0, 0, HTMLCanvas.width, HTMLCanvas.height);

    HTMLCanvas.toBlob(
      (blob) => {
        if (blob) {
          url = URL.createObjectURL(blob);

          if (callback) callback({ url, data: blob });
        }
      },
      "image/jpeg",
      100
    );
  };

  HTMLImage.src = URL.createObjectURL(file);
}
