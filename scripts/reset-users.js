const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️  Deleting all users...')
  
  // Delete all users (cascade will handle related records)
  const deletedUsers = await prisma.user.deleteMany({})
  console.log(`✅ Deleted ${deletedUsers.count} users`)
  
  console.log('\n👤 Creating new admin user...')
  
  // Create new admin user with known password
  const password = 'Admin@123'
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@christuniversity.in',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      department: 'Administration'
    }
  })
  
  console.log('✅ Admin user created successfully!')
  console.log('\n📋 Login Credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Email:    ${adminUser.email}`)
  console.log(`Password: ${password}`)
  console.log(`Role:     ${adminUser.role}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
