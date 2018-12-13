var dbconfig = require("../config/db");
var adminController = {
  FetchAllDetails(callback) {
    return dbconfig.query("select * from admin", callback);
  },
  LoginAdmin(data, callback) {
    var username = data.username;
    var password = data.password;
    let query = "SELECT * FROM admin WHERE username = ? AND password=?";
    dbconfig.query(query, [username, password], callback);
  },
  RegisterAdmin(admin, callback) {
    console.log(admin.username);
    return dbconfig.query(
      "INSERT INTO admin VALUES (?,?,?,?,?)",
      [admin.id, admin.username, admin.password, admin.email, admin.role],
      callback
    );
  }
};

module.exports = adminController;
