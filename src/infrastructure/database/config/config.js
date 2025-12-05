require('dotenv').config();

const config = {
  development: {
    token_secret: process.env.TOKEN_SECRET,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    define: {
      schema: 'task_deck' 
    }
  },
}
const env = process.env.NODE_ENV || 'development';
console.log(env)
console.log(config['development'])
module.exports = config['development']