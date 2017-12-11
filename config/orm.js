var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

var orm = {
  // selectWhere: function(tableInput, colToSearch, valOfCol) {
  //   var queryString = "SELECT * FROM ?? WHERE ?? = ?";
  //   connection.query(queryString, [tableInput, colToSearch, valOfCol], function(
  //     err,
  //     result
  //   ) {
  //     return result;
  //   });
  // },
  all: function (tableInput, returnDataToModel) {
    var queryString = "SELECT * FROM ??;";
    connection.query(queryString, [tableInput], function (err, result) {
      if (err) {
        throw err;
      }
      returnDataToModel(result);
    });
  },
  create: function (tableInput, cols, vals, returnDataToModel) {
    console.log("arguments: " + arguments[1]);
    console.log("arguments: (" + arguments[2] + ");");
    var queryString =
      "INSERT INTO " + tableInput + " (" +
      cols +
      ") VALUES (" +
      printQuestionMarks(vals.length) +
      ") ";

    console.log(queryString);
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      returnDataToModel(result);
    });
  }
};

module.exports = orm;