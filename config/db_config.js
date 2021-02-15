const dbEnv = {
  development: {
    usr: `vagrant`,
    passwd: `hello`,
    db: `cbrm`,
    lhost: `127.0.0.1`,
    ldialect: `postgres`,
    dbport: 5432,
  },
  production: {
    usr: process.env.USR,
    passwd: process.env.PASSWD,
    db: process.env.DB,
    lhost: `127.0.0.1`,
    ldialect: `postgres`,
    dbport: process.env.DBPORT,
  },
}

export default dbEnv
