import Tesseract from "tesseract.js";

const readText = async (img) => {
  const result = await Tesseract.recognize(img, "eng", {
    logger: (m) => console.log(m),
  });
  const { text } = result.data;
  return text;
};

export default readText;
