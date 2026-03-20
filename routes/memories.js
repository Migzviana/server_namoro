const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const auth = require("../middleware/auth");
const cloudinary = require("../cloudinary"); // 👈 IMPORTANTE
const fs = require("fs"); // 👈 pra deletar arquivo depois

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
  try {
    const { text, month } = req.body;

    const parsedMonth = parseInt(month);

    if (isNaN(parsedMonth)) {
      return res.status(400).json({ error: "Mês inválido" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user.coupleId) {
      return res.status(400).json({
        error: "Usuario não está vinculado a um casal",
      });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar memória" });
  }
});

router.get("/memories/:month", auth, async (req, res) => {
      try {
        const month = parseInt(req.params.month);

        const user = await prisma.user.findUnique({
          where: { id: req.user.id },
        });

        const memories = await prisma.memory.findMany({
          where: {
            month,
            coupleId: user.coupleId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        res.json(memories);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar memórias" });
      }
    });

module.exports = router;
