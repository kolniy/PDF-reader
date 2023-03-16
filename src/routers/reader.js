import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import multer from "multer";
import { PythonShell } from "python-shell";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Multer */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ dest: "uploads/", storage });

router.post("/pdf", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.json({ msg: "file not found" });
  }
  try {
    const filePath = req.file.path;
    const scriptPath = path.join(__dirname, "../../scripts/readPDF.py");
    const pyShellOptions = {
      args: [filePath],
    };
    const pyshell = new PythonShell(scriptPath, pyShellOptions);

    let output = "";
    pyshell.on("message", function (message) {
      output += message;
    });

    pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
      res.json({ text: output });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

export default router;
