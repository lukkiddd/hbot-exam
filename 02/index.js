var mongodb = require('mongodb');
var assert = require('assert');

var MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost:27017/HbotDB", function(err, db) {
  assert.equal(null, err);
	insertUsers(db, function() {
		getAllUsers(db, function() {
			getUserByFilter(db, { name: "John" }, function() {
				removeAllUsers(db, function() {
					db.close();
				})
			})
		})
	});
});

var insertUsers = function(db, callback) {
	var collection = db.collection('users');
	var usersList = [
		{ name: "John" },
		{ name: "Joe" },
		{ name: "Bot" }
	]
	collection.insertMany(usersList, function(err, result) {
		assert.equal(err, null);
		console.log("== Insert");
		console.log("Users have been inserted\n");
		callback(result);
	});
}

var getAllUsers = function(db, callback) {
  var collection = db.collection('users');
  collection.find({}).toArray(function(err, users) {
    assert.equal(err, null);
		console.log("== Get all users");
    console.log(users);
		console.log("\n");
    callback(users);
  });      
}

var getUserByFilter = function(db, filter, callback) {
  var collection = db.collection('users');
	var filter = filter || {};
  collection.find(filter).toArray(function(err, users) {
    assert.equal(err, null);
		console.log("== Get user by filter");
		console.log(filter);
    console.log(users);
		console.log("\n");
    callback(users);
  });  
}

var removeAllUsers = function(db, callback) {
  var collection = db.collection('users');
  collection.deleteMany({}, function(err, result) {
    assert.equal(err, null);
		console.log("== Remove all users");
    console.log("All users have been removed");
		console.log("\n");		
    callback(result);
  });    
}
