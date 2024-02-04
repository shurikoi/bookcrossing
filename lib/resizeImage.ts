interface resizeImageProps {
  file: File;
  width?: number;
  height?: number;
  resizeIfSmall? : boolean
  callback?: ({ url, data }: callbackProps) => any;
}

interface callbackProps {
  url: string;
  data: Blob;
}

const MIN_HEIGHT = 120;

export default function resizeImage({ file, width = 700, resizeIfSmall = false, height, callback }: resizeImageProps) {
  let url: string | undefined;

  const HTMLImage = new Image();

  const HTMLCanvas = document.createElement("canvas");

  const ctx = HTMLCanvas.getContext("2d");

  HTMLImage.onload = (e) => {
    const scale = width / HTMLImage.width;

    if (resizeIfSmall && HTMLImage.height * scale < MIN_HEIGHT) {
      HTMLCanvas.width = width * MIN_HEIGHT / (HTMLImage.height * scale);
      HTMLCanvas.height = height ?? HTMLImage.height * scale * MIN_HEIGHT / (HTMLImage.height * scale);
    }
    else{
      HTMLCanvas.width = width;
      HTMLCanvas.height = height ?? HTMLImage.height * scale;
    }

    ctx?.drawImage(HTMLImage, 0, 0, HTMLCanvas.width, HTMLCanvas.height);

    HTMLCanvas.toBlob(
      (blob) => {
        if (blob) {
          url = URL.createObjectURL(blob);

          if (callback) callback({ url, data: blob });
        }
      },
      file.type,
      100
    );
  };

  HTMLImage.src = URL.createObjectURL(file);
}
