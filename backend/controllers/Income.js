
const Incomeschema = require("../models/Incomemodel")



exports.addIncome = async(req,res)=>{
const{title,amount,category,description,date } = req.body 


const Income = Incomeschema({
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
      
        // Save the income to the database
        await Income.save();
        console.log("Income saved to database:", Income);

        return res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.error("Error saving income:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.getIncomes = async(req,res)=>{
    try{
        const incomes = await Incomeschema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    }catch(error){
        res.status(500).json({message:'Server Error'})

    }
}

exports.deleteIncomes = async(req,res)=>{
    const{id}=req.params;
    console.log(req.params)
    Incomeschema.findByIdAndDelete(id).then((Income)=>{
        res.status(200).json({message:'Income Deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message:'Internal Server Error'})
        })
}

   





















