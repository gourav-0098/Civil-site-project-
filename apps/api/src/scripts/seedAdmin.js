import { connectDB, disconnectDB } from '../config/db.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

async function seedAdmin() {
  try {
    console.log('🌱 Seeding administrator account for Nivara Infrastructure...');
    await connectDB();

    const email = env.ADMIN_EMAIL.toLowerCase();
    const existing = await User.findOne({ email });

    const passwordHash = await User.hashPassword(env.ADMIN_PASSWORD);

    if (existing) {
      existing.name = env.ADMIN_NAME;
      existing.role = 'superadmin';
      existing.isActive = true;
      existing.passwordHash = passwordHash;
      await existing.save();
      console.log(`✅ Administrator account updated: ${email} (Role: superadmin, Active: true)`);
    } else {
      const user = new User({
        name: env.ADMIN_NAME,
        email,
        passwordHash,
        role: 'superadmin',
        isActive: true
      });
      await user.save();
      console.log(`✅ Administrator account created: ${email} (Role: superadmin)`);
    }

    console.log('🔒 Administrator seed completed safely.');
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed administrator:', err.message);
    process.exit(1);
  }
}

seedAdmin();
