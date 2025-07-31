import { neon } from neodatabase / serverless;

const sql = neon(`${process.env.DATABASE_URL}`);

export default sql;