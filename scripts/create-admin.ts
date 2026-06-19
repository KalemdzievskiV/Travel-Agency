/**
 * Creates (or updates) an admin user. Credentials come from env vars with
 * sensible dev defaults. Run with: npm run db:create-admin
 *   ADMIN_EMAIL=you@bookit.mk ADMIN_PASSWORD=secret npm run db:create-admin
 */
import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const bcrypt = (await import("bcryptjs")).default;
  const { db } = await import("../src/db/index.ts");
  const { users } = await import("../src/db/schema.ts");
  const { eq } = await import("drizzle-orm");

  const email = (process.env.ADMIN_EMAIL ?? "admin@bookit.mk").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "bookit-admin-2026";
  const name = process.env.ADMIN_NAME ?? "bookit Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, name, role: "admin", updatedAt: new Date() })
      .where(eq(users.email, email));
    console.log(`Updated existing admin: ${email}`);
  } else {
    await db
      .insert(users)
      .values({ email, passwordHash, name, role: "admin" });
    console.log(`Created admin: ${email}`);
  }
  console.log(`  password: ${password}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
