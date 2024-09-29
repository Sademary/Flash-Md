const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0pDQ3FBa3JjN0x3dzd0WGZXeHdLdnBxOG5zamJ3NkowaGJ2dTZucXRtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3JFUFJzZlBucm9ya1BmQkxJcDFwQ1IyQmFuN0R4OXU4NGtPcS9sOHozUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnREJyRStXemcyd1FMZCtRUUhCOUpMOXVnYldmWnB5RktoV2Zuc3htelhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlYW1DWkp1Z0ViOHpDZkUzb09pNTA0K0h4YnNNeVltY2JaV1VBOVRrL0FZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdIb2k4YjN3RWRZYmsrUEQ1YUVpUml1YkV3YzBxWG56aUd0Zkd3Vk9YSE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlI4SW9pOXdqaUlLL3ZoNUVJTTRXcXl4NkVGWER0N2NLSWNmWFBaOURoMDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUR3Q2JQeDhMVjk0b2w5NFVTdU5KWTJvL1E2aXdLdFB1R1N3YXp1Si9VYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTCtUeVlXNFhPZXhIMk1sUFZEK1c4aW10aTdrdGg3Wk9oYUJqdzIvOXZBYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdxNDJnRW9QNmtwdVJVZjJwekkxNDR4UkJ5WTBZbmIyVlZycGRzT0pnL3YyRjc4ZDlPT3JxTGJ1RnltenE0bXhTUmo3WlQ1RUU2TlVNdzlld005b0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJRcU1jK0dZZThEcnh0YXFvbVcwaXl5REpIK2RGa2VsdUZFaE9nbjZ0Nm9rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiMERmYzhpLVFzV002ZnFkZlRlNFVRIiwicGhvbmVJZCI6IjZhNDQyNGFiLWY3M2UtNDI3Ni04MTA0LTFmMmQwZGNmMjVkNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKbmRWd0FMOFFraXgrclY5eFJoSzNNR09iQ009In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWQ1NWNVaWp3ZGx5SXM0cFRRRnhoZTZ6UUhrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJOMkExMTNIIiwibWUiOnsiaWQiOiIyNTU2ODMyMDA5ODU6NjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiX9KkwqPigqbGpsKlINKk4oiG4oKhS+KCrMamJF8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kvdTROc0NFT1czNHJjR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhUdE5rNThNT3JlUVFEZEFOZlZIbFJka0d6UFBWeVgzYUttbGJXRlJmUlE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkpzWkozd3c2VDFqODRhL2Y1M1M4Z2tuQnBaS0ZoYkE2a3RGNmNWamZhUkZZRzZ0WWxXUXF5YXhXQ0EranlTcUo3enpnQXF3SnQvK1hDQzRSUFBVY0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsY0dNZklyT3JzUGJZZ3J5bFF0Z1dYbGNWN3NnYWQwbGgvVGkzaXhPcGdhVVRGcmQ5YVAyaTgvTWRPNkV5aTNMa2VmMS9iYlJLVjVjeGlnOTFnb1dBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY4MzIwMDk4NTo2N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjVTdUWk9mRERxM2tFQTNRRFgxUjVVWFpCc3p6MWNsOTJpcHBXMWhVWDBVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3NTY4ODgyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU16RCJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255683200985",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '1',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
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
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
