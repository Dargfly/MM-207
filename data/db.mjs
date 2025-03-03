import pg from "pg"
const { Client } = pg //samme som pg.Client

const config = {
  connectionString: process.env.DB_CREDENTIALS,
  ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false,
}

create("Insert ......", "34")

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

    if (result.rowcount <= 0) {
      throw new error("No records created");
    }

    return result.row[0];
  } catch (error) {
    //FEILHÅNDTERING HAVNER HER

    console.error(error);
    return null
  } finally {
    client.close();
  }

}



