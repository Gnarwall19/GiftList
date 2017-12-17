var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

var orm = {
  all: function(tableInput, returnDataToModel) {
    var queryString = "SELECT * FROM ??;";
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) {
        throw err;
      }
      returnDataToModel(result);
    });
  },

  searched: function(tableInput, col, searchTerm, returnDataToModel) {
    connection.query(
      `select * from ${tableInput} where ?? like ?;`,
      [col, searchTerm],
      function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        returnDataToModel(result);
      }
    );
  },
  create: function(tableInput, cols, vals, returnDataToModel) {
    console.log("arguments: " + arguments[1]);
    console.log("arguments: (" + arguments[2] + ");");
    var queryString =
      "INSERT INTO " +
      tableInput +
      " (" +
      cols +
      ") VALUES (" +
      printQuestionMarks(vals.length) +
      ") ";

    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      returnDataToModel(result);
    });
  },
  findOne: function(tableName, id, returnDataToModel) {
    var id_format = parseInt(connection.escape(id));

    connection.query(
      {
        sql: "SELECT * FROM " + tableName + " WHERE id = ?",
        values: [id_format]
      },
      function(err, result) {
        if (err) {
          throw err;
        }
        returnDataToModel(result);
      }
    );
  }
};

module.exports = orm;
