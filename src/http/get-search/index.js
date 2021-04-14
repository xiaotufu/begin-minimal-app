var MongoClient = require('mongodb').MongoClient;
var pass = process.env.PASS;
var link = process.env.LINK;
var url = `mongodb+srv://root:${pass}@${link}/miniapp?retryWrites=true&w=majority`
var conn = function(url){
  return new Promise((resolve,reject)=>{
    MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true}, function(err, db) {
      if (err) reject(err);
      else resolve(db);
    })
  })
}
var toArray = function(data){
  return new Promise((resolve,reject)=>{
    data.toArray((err,res)=>{
      if(err)reject(err)
      else resolve(res);
    })
  })
}


// HTTP function
exports.handler = async function http(req) {  
  try {
    var con = await conn(url);
    var res = await toArray(con.db('miniapp').collection('test').find({}));
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
  
}