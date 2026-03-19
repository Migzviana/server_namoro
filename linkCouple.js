const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function linkCouple() {
  const couple = await prisma.couple.create({});

  await prisma.user.update({
    where: { email: "miguel@email.com" },
    data: { coupleId: couple.id },
  });

  await prisma.user.update({
    where: { email: "liviaoliveira@email.com" },
    data: { coupleId: couple.id },
  });
}

linkCouple();