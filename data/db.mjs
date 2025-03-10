import pg from "pg"
const { Client } = pg //samme som pg.Client

const config = {
  connectionString: process.env.DB_CREDENTIALS,
  ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false,
}

// create("Insert ......", "34")

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

function runQuery(statement, ...values) {
  const client = new Client(config)
  const result = client.query(statement, [...values])

  try {
    client.connect();
    client.query(statement, [...values]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("No records found");
    }
  } catch (error) {
    //FEILHÅNDTERING HAVNER HER

    console.error(error);
    return null
  } finally {
    client.end();
  }

}



