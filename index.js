//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');  // Request / response json parser
const envConfig = require('./envConfig');
const logger = require('./logger');
const app = express();

console.log("Config",envConfig);
app.set('log', logger());

//app.set('envData', envConfig);
//console.log("envData",app.get('envData').PORT); 

const { Pool, Client } = require('pg') // Postgres Library


const logFormat = {
	type : 'info',
	message : ""
}

app.set('logFormat', logFormat);
const { NODE_ENV }  = process.env;
console.log(NODE_ENV);

const { PORT, DB_HOST, DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT } = envConfig;


/* PolyFill Example */
arr = [11,554,"hello","bye","gud bye",939,3,455,34];
//console.log(arr);
if(! Array.addString) {
	Array.prototype.addString = function(keyString) {
		let arr = this.map(item => { return `${keyString} ${item} `} )
		
		return arr;
	};
}

console.table(arr.addString('BlueApps'))

arr2 = ['kamesh','mohd','neha'];

console.table(arr2.addString('Hello '))

/* End  PolyFill Example */

/*if(NODE_ENV == "production") {	
	var { PORT, DB_HOST, DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT } = config.production;
	
}else if(NODE_ENV == "development") {	
	var { PORT, DB_HOST, DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT } = config.development;
	
}else {	
	var { PORT, DB_HOST, DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT} = config.local;
}
*/

const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
	app.get('log').error({
		...app.get('logFormat'),
		type : 'error',
		msga : "error code"
	});

	res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/mapFunc', (req, res) => {
	//console.log(global);
	let score = "80%"
	const students = ['Mohd Jainuddin','Kamesh','Neha',"Prasad"]
	const finalData = students.map(record => ({name:record,age:18,score}))
	console.log(finalData);
    
	const finalData2 = students.map( (record,index) => {
		if(index == 0) {
			return {name:record,age:18,score,id:index}
		}else {
			return {name:record,age:20,score:'90%',id:index}
		}
	})
	
	let x = [1,2,3,4,5]
	console.log(` X is ${x} `);
	let slice = x.slice(1,4);
	
	console.log(`slice is ${slice} `);
	console.log(`x is ${x}`);
	
	let splice = x.splice(1,2);
	console.log(`splice is ${splice} `);
	console.log(`x is ${x}`);
	
	//console.log(finalData2); 
	let obj = { name: "lione" };
	let b = obj;
	obj.name = "Mohd";
	console.log(obj)
	console.log(b);
	
	res.send(finalData2);
})

app.get('/getUsers', (req, res) => {
	//logger.info("getUsers API Request",req.params);
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
		 // logger.info("getUsers Query Error",error);
		  res.status(200).json({"status":false,"message":"getUsers Query Error"})
		  //throw error
		}
		
		results.rows.map(function (row) {  // Iterate array
			
			 delete row.password;
			 row.username = row.username +" - BlueApps";
			 return row;
		});
		
		/* results.rows.filter(row => {  // Iterate array
			if(row.verify == "1") {
				console.log(typeof row.verify+" eq 1");
				return true;
			}else {
				console.log(typeof row.verify);
				return false;
			}
			 //return row.verify == "1";
		}); */
		
		 results.rows = results.rows.filter(row => row.verify == "1")
		//console.log(results);
		res.status(200).json(results.rows)
	})
})


app.listen(PORT, () => {
  console.log(`App s running on port ${PORT}.`)
})
