const router = require("express").Router();
const {
  list,
  add,
  update,
  deleteData,
  show,
} = require("../controllers/product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, "../public/images/products");
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", list);
router.get("/:id", show);
router.post("/", upload.single("image"), add);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", deleteData);

module.exports = router;
