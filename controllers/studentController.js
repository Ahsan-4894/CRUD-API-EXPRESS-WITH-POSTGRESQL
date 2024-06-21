import pool from "../config/dbconfig.js";

class CRUD{
    static getStudentById = async (req, res)=>{
        const id = req.params.id;
        if(id){
            //pick a client to serve the request of getting student by his/her id
            const client = await pool.connect();
            try {
                //simple query to get a student by id stored in result variable
                const result = await client.query('SELECT * FROM students WHERE std_id=$1', [id]);
                if(result.rows.length>0){
                    //if student exist, its whole row will be stored in result var if not then result's var length must be 0
                    res.send({"Ststus":"Success", "Message":result.rows});    
                }else{
                    res.status(400).send({"Status":"Error" ,"Message":"No such students exist!"});
                }
            } catch (error) {
                res.status(500).send({"Status":"Error" ,"Message":"An error occurred!"});
            }finally{
                //put back client as request has been served
                client.release(); 
            }
        }else{
            //condition that id is inputted from the frontend or not
            res.status(400).send({"Status":"Error" ,"Message":"All fields are required!"});
        }
    }
    static insertStudent = async (req, res)=>{
        const {std_id, firstName, lastName, Department, Section} = req.body;
        const client = await pool.connect();
        try {
            //what if a student with std_id already exists?
            const isExist = await client.query('SELECT * FROM students WHERE std_id=$1', [std_id]);
            if(isExist.rows.length!==0){
                res.status(500).send({"Status":"Error" ,"Message":"Student already exists with this std_id!"});                    
            }else{
                //append data to users table
                const result = await client.query('INSERT INTO students (std_id, firstname, lastname, department, section) VALUES ($1, $2, $3, $4, $5)', [std_id, firstName, lastName,Department, Section]);
                res.status(201).send({"Status":"Success" ,"Message":"Student has been added!"});
            }
        } catch (error) {
            res.status(500).send({"Status":"Error" ,"Message":"An error occurred!"});
        }finally{
            client.release();
        }
    }
    static updateStudent = async (req, res)=>{
        const {id} = req.params;
        if(id){
            const {std_id, firstName, lastName, Department, Section} = req.body;
            if(std_id && firstName && lastName && Department && Section){
                const client = await pool.connect();
                try {
                    await client.query('UPDATE students SET std_id=$1,firstname=$2,lastname=$3, department=$4, section=$5 WHERE std_id=$6',[std_id, firstName, lastName, Department, Section, id]);
                    res.status(201).send({"Status":"Success" ,"Message":"Student has been updated!"});
                } catch (error) {
                    res.status(500).send({"Status":"Error" ,"Message":"An error occurred!"});
                }finally{
                    client.release();
                }
            }else{
                res.status(400).send({"Status":"Error" ,"Message":"All fields are required!"});                
            }
        }else{
            res.status(400).send({"Status":"Error" ,"Message":"All fields are required!"});
        }
    }
};

export default CRUD;
