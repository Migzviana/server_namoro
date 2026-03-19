const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });

router.post("/memories", auth, upload.single("image"), async (req, res) => {
  const { text, month } = req.body;

  const parsedMonth = parseInt(month);

  if (isNaN(parsedMonth)) {
    return res.status(400).json({ error: "Mês inválido" });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

    console.log("USER:", user);

  if (!user.coupleId){
    return res.status(400).json({
      error: "Usuario não está vinculado a um casal"
    })
  }

  const imageUrl = req.file ? "/uploads/" + req.file.filename : null;

  const memory = await prisma.memory.create({
    data: {
      message: text || "",
      month: parsedMonth,
      imageUrl,
      authorId: req.user.id,
      coupleId: user.coupleId,
    },
  });

  res.json(memory);
});

router.get("/memories/:month", auth, async (req, res) => {
  const month = parseInt(req.params.month);
  
  const user = await prisma.user.findUnique({
    where: { id: req.user.id},
  })

  const memories = await prisma.memory.findMany({
    where: {
       month,
      coupleId: user.coupleId, 
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(memories);
});

module.exports = router;
