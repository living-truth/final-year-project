
const Expenseschema = require("../models/Expensemodel")



exports.addExpense = async(req,res)=>{
const{title,amount,category,description,date } = req.body 


const Expense = Expenseschema ({
    title,
    amount,
    category,
    description,
    date
    })

    try{
        //validations
        if(!title||! category||!description||!date){         
        return res.status(400).json({message:'All fields are required'})
        }

       if (amount<=0 || !amount==="number"){
         return res.status(400).json({message:'Amount must be a positive value'})
        }  
      
        // Save the Expense to the database
        await Expense.save();
        console.log("Expense saved to database:", Expense);

        return res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        console.error("Error saving Expense:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.getExpense = async(req,res)=>{
    try{
        const expenses= await Expenseschema.find().sort({createdAt:-1})
        res.status(200).json(expenses)
    }catch(error){
        res.status(500).json({message:'Server Error'})

    }
}

exports.deleteExpense = async(req,res)=>{
    const{id}=req.params;
    console.log(req.params)
    Expenseschema.findByIdAndDelete(id).then((Expense)=>{
        res.status(200).json({message:'Expense Deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message:'Internal Server Error'})
        })
}

   





















