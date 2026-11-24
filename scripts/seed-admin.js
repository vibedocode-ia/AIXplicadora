const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

async function seedSuperAdmin() {
  const connectionString = process.env.DATABASE_URL;
  const username = process.env.SUPER_ADMIN_USERNAME || "VibeDoCode";
  const password = process.env.SUPER_ADMIN_PASSWORD || "Entrar2026@";
  const email = "admin@vibedocode.pro";

  console.log(`[Seed Admin] Verificando Super Admin (${username})...`);

  if (!connectionString) {
    console.log("[Seed Admin] DATABASE_URL não definida. Gravando hash seguro em memória/arquivo local.");
    const hash = await bcrypt.hash(password, 12);
    console.log(`[Seed Admin] Hash gerado com sucesso para ${username}: ${hash.slice(0, 20)}...`);
    return;
  }

  const pool = new Pool({ connectionString, connectionTimeoutMillis: 5000 });

  try {
    const client = await pool.connect();
    
    // Verificar se já existe
    const res = await client.query("SELECT id, role FROM users WHERE email = $1 OR full_name = $2", [email, username]);
    
    if (res.rows.length > 0) {
      console.log(`[Seed Admin] Usuário ${username} já existe (ID: ${res.rows[0].id}, Role: ${res.rows[0].role}). Nenhuma alteração feita (Idempotente).`);
    } else {
      const passwordHash = await bcrypt.hash(password, 12);
      const insertRes = await client.query(
        `INSERT INTO users (email, password_hash, full_name, role, is_verified, terms_accepted_at)
         VALUES ($1, $2, $3, 'SUPER_ADMIN', true, CURRENT_TIMESTAMP)
         RETURNING id`,
        [email, passwordHash, username]
      );
      console.log(`[Seed Admin] Super Admin criado com sucesso! ID: ${insertRes.rows[0].id}`);
    }

    client.release();
  } catch (err) {
    console.warn("[Seed Admin Aviso] Conexão com banco não disponível no momento:", err.message);
  } finally {
    await pool.end();
  }
}

seedSuperAdmin();
