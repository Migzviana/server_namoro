const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main(){

  const password = await bcrypt.hash("19122025",10)

  await prisma.user.create({

    data:{
      name:"Miguel",
      email:"miguel@email.com",
      password
    }

  })

  await prisma.user.create({
    data:{
      name:"Livia",
      email:"liviaoliveira@email.com",
      password
    }

  })

}

main()