import { PrismaClient } from '@prisma/client'




export default async function RunWay() {
  
    const prisma = new PrismaClient()

const runn = async () => {
  const admin = await prisma.user.upsert({
    where: { email: 'anas@gmail.com' },
    update: {},
    create: {
      email: 'anas@gmail.com',
      password: 'admin123',
      role: 'ADMIN'
    }
  })
  console.log('Admin created:', admin)
}
  return (
    <button onClick={runn}>
      runn
    </button>
  );
}

