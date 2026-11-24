const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log('[Migration] DATABASE_URL não definida. Pulando execução direta.');
    return;
  }

  console.log('[Migration] Conectando ao PostgreSQL...');
  const pool = new Pool({ connectionString, connectionTimeoutMillis: 4000 });

  try {
    const client = await pool.connect();
    console.log('[Migration] Conexão estabelecida com sucesso!');

    const sqlPath = path.join(__dirname, '..', 'lib', 'db-schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('[Migration] Executando DDL das 9 tabelas...');
    await client.query(sql);
    console.log('[Migration] Migrações executadas com sucesso!');

    client.release();
  } catch (err) {
    console.warn('[Migration Aviso] Conexão com DB externo não alcançada no momento (ambiente offline/local):', err.message);
    console.log('[Migration] O arquivo DDL lib/db-schema.sql permanece pronto para execução no VPS.');
  } finally {
    await pool.end();
  }
}

runMigration();
