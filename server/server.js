const express = require("express");
const fs = require("fs")
const resizeImage = require("./resizeImage");
const app = express();
const cors = require("cors");

app.use(express.json({
  limit: "50mb"
}));
app.use(cors());

app.get("/images/:folder/:image", (req, res) => {
  const { folder, image } = req.params;

  res.sendFile(`${__dirname}/images/${folder}/${image}`);
});

app.post("/upload", async (req, res) => {
  try {
    const { path, image, apiKey } = req.body;

    if (process.env.UPLOAD_KEY != apiKey) throw new Error()
    
    const buffer = Buffer.from(image.split(",")[1], "base64");

    const resizedImage = await resizeImage(buffer);

    fs.writeFileSync("./images" + path, resizedImage);
    
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(404).send({ ok: false });
  }
});

app.listen(5000, () => {});
