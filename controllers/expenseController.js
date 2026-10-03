const pool = require("../config/database");



// GET ALL

const getExpenses = async(req,res)=>{

    try{

        const result = await pool.query(
            "SELECT * FROM expenses ORDER BY id"
        );


        res.json(result.rows);


    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};




// GET BY ID

const getExpenseById = async(req,res)=>{


    try{


        const {id}=req.params;



        const result = await pool.query(

            "SELECT * FROM expenses WHERE id=$1",

            [id]

        );



        if(result.rows.length===0){

            return res.status(404).json({

                message:"Expense not found"

            });

        }



        res.json(result.rows[0]);



    }catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server error"

        });

    }

};




// CREATE

const createExpense = async(req,res)=>{


    try{


        const {
            title,
            amount,
            category,
            date

        }=req.body;



        const result = await pool.query(

            `INSERT INTO expenses
            (title,amount,category,date)
            VALUES($1,$2,$3,$4)
            RETURNING *`,

            [
                title,
                amount,
                category,
                date
            ]

        );



        res.status(201).json(result.rows[0]);



    }catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server error"

        });

    }

};





// UPDATE

const updateExpense = async(req,res)=>{


    try{


        const {id}=req.params;


        const {
            title,
            amount,
            category,
            date

        }=req.body;



        const result = await pool.query(

            `UPDATE expenses

            SET title=$1,
            amount=$2,
            category=$3,
            date=$4

            WHERE id=$5

            RETURNING *`,

            [
                title,
                amount,
                category,
                date,
                id
            ]

        );



        if(result.rows.length===0){

            return res.status(404).json({

                message:"Expense not found"

            });

        }



        res.json(result.rows[0]);



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server error"

        });

    }

};






// DELETE

const deleteExpense = async(req,res)=>{


    try{


        const {id}=req.params;



        const result = await pool.query(

            "DELETE FROM expenses WHERE id=$1 RETURNING *",

            [id]

        );



        if(result.rows.length===0){

            return res.status(404).json({

                message:"Expense not found"

            });

        }



        res.json({

            message:"Deleted successfully"

        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server error"

        });

    }

};




module.exports={

    getExpenses,

    getExpenseById,

    createExpense,

    updateExpense,

    deleteExpense

};