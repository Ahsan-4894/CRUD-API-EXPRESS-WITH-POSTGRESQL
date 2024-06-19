const isValid = (req, res, next)=>{
    const {std_id, firstName, lastName, Department, Section} = req.body;
    if(std_id && firstName && lastName && Department && Section){
        const idPattern = /^\d{2}[KLPQI]-\d{4}$/;
        const namePattern = /^[a-zA-Z]+$/;
        const departmentPattern = /^[a-zA-Z]{2,5}$/;
        const sectionPattern = /^[a-zA-Z]{1}$/;  
        if(!idPattern.test(std_id)){
            res.status(400).send({"Status":"Error" ,"Message":"Invalid std_id field format"});
        }else if(!namePattern.test(firstName) || !namePattern.test(lastName)){
            res.status(400).send({"Status":"Error" ,"Message":"Invalid name field format!"});
        }else if(!departmentPattern.test(Department)){
            res.status(400).send({"Status":"Error" ,"Message":"Invalid Department field format, 2-5 characters are allowed!"});
        }else if(!sectionPattern.test(Section)){  
            res.status(400).send({"Status":"Error" ,"Message":"Invalid Section field format, Only 2 characters are allowed!"});
        }else{
            next();
        }
    }else{
        res.status(500).send({"Message":"All fields are rqeuired!"});
    }
}
export default isValid;
