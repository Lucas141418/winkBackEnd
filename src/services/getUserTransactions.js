const { UserModel } = require("../model/UserModel");
const { createResponse } = require("../utils");



const getUserTransactions = async (e) => {
  const { userId } = e.pathParameters;
  const { limit = 10, lastEvaluatedKey } = e.queryStringParameters || {};

  try {
    const userTransactions = await UserModel.getTransactionsModel({
      userId,
      limit: parseInt(limit),
      lastEvaluatedKey,
    });
    if (!userTransactions) return createResponse(404, { message: "The transactions doesn't exit" });
    const body = {
      transactions: userTransactions.item,
      lastEvaluatedKey: userTransactions.lastEvaluatedKey
        ? JSON.stringify(userTransactions.lastEvaluatedKey)
        : undefined,
    };


    return createResponse(200, body);
  } catch (error) {
    console.log(error)
    return createResponse(500, {error: "Failed to fetch the user"})
  }
};
module.exports = {
  getUserTransactions,
}