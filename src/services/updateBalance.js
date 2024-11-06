const { UserModel } = require("../model/UserModel");
const { createResponse } = require("../utils");

const updateBalance = async (e) => {
  const { userId, amountTransaction } = e.pathParameters;

  try {
    const { data } = await UserModel.updateBalanceModel({
      userId,
      amountTransaction: parseFloat(amountTransaction),
    });
    if (!data)
      return createResponse(404, {
        message: "Error updating the balance",
      });
    return createResponse(201, {
      message: "Transactio create succesfully",
      data: data,
    });
  } catch (err) {
    console.error(err);
    return createResponse(500, { message: err });
  }
};

module.exports = {
  updateBalance,
};
