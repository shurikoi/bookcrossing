export default function getExtension(name: string, base64 : boolean = false){
    if (base64) return name.match(/\/([^;]+);/)![1];

    return name.split(".").at(-1)
}