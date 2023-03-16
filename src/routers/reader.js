import express from "express";
import multer from "multer";
import readText from "../utitilities/readText.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.json({ msg: "file not found" });
  }
  try {
    const imageData = req.file.buffer;
    const text = await readText(imageData);
    res.json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

export default router;
