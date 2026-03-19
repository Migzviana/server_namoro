const bcrypt = require("bcrypt");
const router = require("express").Router();

router.get("/seed", async (req, res) => {
  try {
    const password = await bcrypt.hash("19122025", 10);

    // cria casal
    const couple = await prisma.couple.create({
      data: {},
    });

    // cria usuários
    const user1 = await prisma.user.create({
      data: {
        name: "Miguel",
        email: "miguel@email.com",
        password,
        coupleId: couple.id,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: "Livia",
        email: "liviaoliveira@email.com",
        password,
        coupleId: couple.id,
      },
    });

    res.json({
      couple,
      user1,
      user2,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar seed" });
  }
});

module.exports = router;