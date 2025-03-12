import pg from "pg"
const { Client } = pg //samme som pg.Client

const config = {
  connectionString: process.env.DB_CREDENTIALS, // Bruk miljøvariabelen her
  ssl: { 
    rejectUnauthorized: false, 
  },
};

async function create(statement, ...values) {
  return await runQuery(statement, ...values);
}
async function update(statement, ...values) {
  return await runQuery(statement, ...values);
}
async function read(statement, ...values) {
  return await runQuery(statement, ...values);
}
async function purge(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function runQuery(query, ...values) {
  const client = new Client(config); // <-- Oppretter en ny klient
  await client.connect(); // <-- Koble til databasen
  // const client = await client.connect();

  try {
    const result = await client.query(query, values);
    console.log("Connected to the database successfully!");

    if (result.rowCount <= 0) {
      throw new Error("Row count is 0. No records created.");
    }

    if (query.trim().toUpperCase().startsWith("SELECT")) {
      return result.rows;
    }

    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

// Insert "Hello world!" into the messages table
create("INSERT INTO recipes (object) VALUES ($1) RETURNING *;", ["Hello world!"])
  .then(result => console.log("Inserted:", result))
  .catch(error => console.error("Error inserting:", error));