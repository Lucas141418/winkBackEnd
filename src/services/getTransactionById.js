const { UserModel } = require("../model/UserModel");
const { createResponse } = require("../utils");

const getTransactionById = async (e) => {
  const { userId, transactionId } = e.pathParameters;

  try {
    const transactionInfo = await UserModel.getTransactionByIdModel({
      userId,
      transactionId,
    });

    if (!transactionInfo) return createResponse(408, { message: "Transaction wasn't found" });
    return createResponse(200, transactionInfo);
  } catch (error) {
    console.error(error);
    return createResponse(500, "Failed to fetch the transaction");
  }
};

module.exports = {
  getTransactionById,
};
