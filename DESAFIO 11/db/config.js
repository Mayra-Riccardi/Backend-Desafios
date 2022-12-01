const envConfig = require('../config');

module.exports = {
    mariaDB: {
       client: 'mysql',
       connection: {
        host : '192.168.64.2',
        port : 3306,
        user : 'root',
        database : 'ecommerce'
       }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './db/sqlite/chat.sqlite'
        }
    },

    mongodb: {
        uri: `mongodb+srv://mayricca5:${envConfig.DB_PASSWORD}@youneedsushi.nuk3cgy.mongodb.net/users?retryWrites=true&w=majority`,
      }
    
}