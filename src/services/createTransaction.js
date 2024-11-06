const crypto = require("node:crypto");
const { UserModel } = require("../model/UserModel");
const { createResponse } = require("../utils");
const { transactionValidation } = require("../schemas/transaction");

const createTransaction = async (e) => {
  const transactionId = crypto.randomUUID();
  const date = new Date();
  const timeTransaction = date.toLocaleString();

  const {
    detailsTransaction,
    recipientPhone,
    userId,
    recipientName,
    amount,
    recipientId,
  } = JSON.parse(e.body);

  const newTransaction = {
    detailsTransaction,
    timeTransaction,
    recipientPhone,
    userId,
    recipientName,
    amount,
    recipientId,
    transactionId,
  };

  try {
    const validation = transactionValidation(newTransaction);
    if (validation !== true) {
      return createResponse(403, { message: validation });
    }
    const { data } = await UserModel.createTransactionModel({
      newTransaction,
    });
    if (!data)
      return createResponse(404, {
        message: "Error Creating the transaction",
      });
    
    const { updatedBalance } = await UserModel.updateBalanceModel({
      userId,
      amountTransaction: parseFloat(amount)
    })

    if(!updatedBalance) return createResponse(404, {
      message: "Error updating the balance",
    });


    return createResponse(201, {
      message: "Transaction created succesfully",
      data: {...data, ...updatedBalance}
    });
  } catch (err) {
    console.error(err);
    return createResponse(500, { meessage: err });
  }
};

module.exports = {
  createTransaction,
};
