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
    getOrientation(file, (orientation: number) => {
      if (orientation < 5 && orientation > 0) {
        HTMLCanvas.width = HTMLImage.height / (HTMLImage.width / width);
        HTMLCanvas.height = width;
      } else {
        HTMLCanvas.width = width;
        HTMLCanvas.height = HTMLImage.height / (HTMLImage.width / width);
      }

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
    });
  };

  HTMLImage.src = URL.createObjectURL(file);
}

function getOrientation(file: File, callback: (orientation: number) => void) {
  var reader = new FileReader();

  reader.onload = (event: ProgressEvent) => {
    if (!event.target) return;

    const file = event.target as FileReader;
    const view = new DataView(file.result as ArrayBuffer);

    if (view.getUint16(0, false) != 0xffd8) {
      return callback(-2);
    }

    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
      let marker = view.getUint16(offset, false);
      offset += 2;

      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) {
          return callback(-1);
        }

        let little = view.getUint16((offset += 6), false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        let tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) == 0x0112) {
            return callback(view.getUint16(offset + i * 12 + 8, little));
          }
        }
      } else if ((marker & 0xff00) != 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return callback(-1);
  };

  reader.readAsArrayBuffer(file);
}
