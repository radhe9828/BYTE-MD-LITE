 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk8rVDByZm1XdGNESG1ld2hpcVJPNmxqT2EzdWhwQ3JTMVRESDhnUlgycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFdGVHlMOXVUbkJ4YWhnWGt4bUMrSXl3M3gwV1hRYVB0dGdlbjZYSk9HND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQ00zTDMydHhOUkFEVEhJVjJOajZTQk5xQjJtL2MrZ294Kzl5TlU2cjFBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSjZ0NlVLbldVTHlyMzhPZW5CcXNqZlNDTUdNNG90MExkTmcxTDF2b1ZJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLQkVQVXVCSlN1NncrVzYyVmIvVlJGVGFreTdLeElzcjhmeWdsaGYrMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im14RXRTd0ZvajlvWUFZbXc5UGNic3pkdjJnbkNnN2R0ejlxK21haUYrbms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERmRThGd3ZRc0NDdmtxa2lid3RmeU15ZDd1VzQ5VUYvR0UrSWRRWGRXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGZWU0gzcjZmejVoRmpCSEkxek40ZHlyUmRzcjV0dE5TTTI1Qmw2THkyST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InAxQ2syRVF0eG9yTC9hZzM4bnFZVUtqcGc0VWo1RTk5VnZRWWdHU2VYd0tNbXNBVS8rMFQya3NhcGh5ZGRSelA5VmtYbGorUUExY095cUJicnMxSENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJjU1d6L2dwYnd5enJlRDAzRmEvc0lHUm1ZcHJmeVBNRmdERkhDV0xyUUg4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxODk1NTg5ODc2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCMTY1MzNBREYyQUY5RTI5QURDRjk0NEVCMzk3NTk4RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxNTI1MjcyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTg5NTU4OTg3NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNDAxNUNDMkZEQTlFQjNGMUVEMzFDQ0Q4OUVCNDhGMDEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTUyNTI3Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQ2s3TzVyanlUSVdYMW1ZU0dXT0x1USIsInBob25lSWQiOiIxOTk4NmE3Ni1mYWM0LTRkZWEtYjk2YS05MzEwOWI3OTdhN2EiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHJpU0FLZHRnbk1GWGJtV3JYazZHeTRwL3dzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhLVFJ5MUdGQURBMlJSMjQrQ2tWbkZiK1ZIST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSSjdZNlhRMiIsIm1lIjp7ImlkIjoiOTE4OTU1ODk4NzYzOjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4KSs4KWHJ+CkqOCkvifgpK4g4KSs4KS+J+CkpifgpLbgpL4n4KS5In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKS0d6cnNDRUlmSThiUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqY3cxOS9LWmxsRDVjZnFlQVYwM0xOaHJTaHNzNDYzdlloNXdDRm1nYWs0PSIsImFjY291bnRTaWduYXR1cmUiOiJlMFoxZG1LV3h5UWc1TVFCTEI0VkpRQU1EbVVxSzdSZlNTRGpvck5ja3NWNy80NjN4Zk82OGdKOE5PWjE2dnVCUU9wMkRCaU4yLzE1Yi9iblBadzRBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZDFsVzh5QTMwOWlMamFyOFQyenphTENFZnBYK09ObjBsWFpnQ2xGTmxhUzVqQ1NCZ28yeXFmSHdGcUF3bDRFaEkyTDlSLzA3KzZ2dHlnQVpraHpaQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTg5NTU4OTg3NjM6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZM01OZmZ5bVpaUStYSDZuZ0ZkTnl6WWEwb2JMT090NzJJZWNBaFpvR3BPIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNTI1MjY4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNHVCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "918955898763",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
