const morgan = require('morgan');
const express = require('express');
const router = require('express-promise-router')();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
const cors = require('cors');
let connection = undefined;
async function db_query(query,params){
    if( connection === undefined ){
        connection = await oracledb.getConnection({
            user:'c##tamim',
            password:'password',
            connectionString:'localhost/orcl'
        });
    }
    try{
        let result = await connection.execute(query,params);
        return result.rows;
    }catch (error){
        console.log(error);
    }
}

router.get("/employee/all", async function (req, res, next) {
    console.log("We are here");
    const query = "SELECT * FROM EMPLOYEES";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
})
const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.listen(4321, () => {
    console.log("server listening at port 4321");
})