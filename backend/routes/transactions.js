const express = require('express');
const router = express.Router();

const { addIncome, getIncomes, deleteIncomes } = require('../controllers/Income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');

router
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .delete('/delete-income/:id', deleteIncomes)
  .post('/add-expense', addExpense)
  .get('/get-expenses', getExpense)
  .delete('/delete-expense/:id', deleteExpense);

module.exports = router;
