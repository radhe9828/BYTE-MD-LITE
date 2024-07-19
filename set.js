 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0t5U1I1eXFRUWRBSmlKYU54amV0LzB1RXBhTytSTjU0UUFuWEFoeURuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVRwTS9KZ01QMldwVm4rRjlmWC9xWW4zMUZUYWtYYmoyRUgraU9pc2RTaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQWhmNHhZSkdxNnpLaDc1RUZVM2ZpS1V5cXB1dW02QnRzK0JpdjFBYzNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhT1V4eStoNkQ4QTRWa2tRMEhGUllaTmQ1emk3N3NEQ2NmWTcvU1RydVJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1BR0pkd3VIR3pCNXpJbmtVQVF0NFRZaytNSzdSYk45YXdqV0t4YVJUa3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNwaUdUOEcvTSt0amRvK05KaEtING0vMXprclYvc29HYXhNeEZLZGZVeVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0xUMlo5bW84eTdLRE0yWEx0amdyK3h4RURwODB6SVJGaTkza3orTlRYcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXZKNW9NSUhUdnN5MW8wMk9Da1ljVVliUGFQTnJPRmgyRGl6eFE4YW0yUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtqYzN4RmZ3RkVoQk01Y2xEV1g2VEFCOTFBRmlFMGVDMGFPU0RKcU5LQklvMWF3WEJZS213OThzeVZMUGUrYmJnemxuTzJFNjVXZlBlNEh5TWRENEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJHWDY5UzdjWnR5NFpmTHFxYjJtR0FIWXNieUhwZGg5Vi81NFBWSGl2cHFVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxODk1NTg5ODc2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzRERCN0IzQkNFQUU3NEE0QTkwREY3Q0MyOTBFMkYzRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxNDAyNzM2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTg5NTU4OTg3NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjFFQzZEOTUzN0U1RTRDRDNDOUE2QkQyNjZGNDlCOEUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTQwMjczN31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiOTZLVDB4YzVTM3lUZWNUaG1OamQ3USIsInBob25lSWQiOiJmMzFjMGI2MS00NzM2LTQ4MWUtOTdkZS01ZTNkZWI1MDNjZWQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWp2d2w1ajQxOFlXd1FkVDA1NjZvOFBoTHR3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIxSzduaVJDOTFhZkNXWS9yVjhwNmxxdGozUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJZNjY4NkZRSyIsIm1lIjp7ImlkIjoiOTE4OTU1ODk4NzYzOjg0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuCkrOClhyfgpKjgpL4n4KSuIOCkrOCkvifgpKYn4KS24KS+J+CkuSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVNHenJzQ0VPS0s2clFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiamN3MTkvS1psbEQ1Y2ZxZUFWMDNMTmhyU2hzczQ2M3ZZaDV3Q0ZtZ2FrND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMFNIcWpLTm5XYUdCKzQrNjBPSTg2VkRRZE00bVVvTkp6THNBR2FwKzZRL0x0R0lydHY4NzVBcGtPaGYwR1hCWGxsdjVuNlkyTlZuVHVSMm14SDFpQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IlV6SGc4dytVaTlDN20vdSswK0RqZGNlSzE5cEdBd2t5enVlVkNNZHN6bnNLaDhyWlhGTDlzR0dVSGIvQzBWaU5ZU3BPQ2YxY2JhUms2Rjc0dlZBQUR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4OTU1ODk4NzYzOjg0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlkzTU5mZnltWlpRK1hINm5nRmROeXpZYTBvYkxPT3Q3MkllY0FoWm9HcE8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE0MDI3MzQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRVFjIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "RADHE",
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
