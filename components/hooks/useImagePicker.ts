import { useState } from "react";

export default function useImagePicker(callback?: (e: any) => void) {
  const [file, setFile] = useState<File>();

  function pickImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.click();

    const div = document.createElement("div");

    div.className = "preventedClick z-50 opacity-0 fixed top-0 left-0 w-screen h-screen";

    function handleChange(e: any) {
      setTimeout(() => {
        div.remove();
      }, 1000);

      setFile(e.target.files[0]);

      if (callback) callback(e);
    }

    function handleClick(e: any) {
      if (window.innerWidth >= 768) {
        window.addEventListener("focus", handleFocus);

        document.body.appendChild(div);
      }
    }

    function handleFocus(e: any) {
      setTimeout(() => {
        div.remove();
      }, 1000);

      window.removeEventListener("focus", handleFocus);
    }

    input.addEventListener("change", handleChange);
    input.addEventListener("click", handleClick);

    return () => {
      input.removeEventListener("change", handleChange);
      input.removeEventListener("click", handleClick);
    };
  }

  return { file, setFile, pickImage };
}
