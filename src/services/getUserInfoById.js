const { UserModel } = require("../model/UserModel");
const { createResponse } = require("../utils");

const getUserInfoById = async (e) => {
  const { userId } = e.pathParameters;

  try {
    const userInfo = await UserModel.getUserInfoByIdModel({ userId });

    if (!userInfo) return createResponse(404, { message: "User wasn't found" });

    return createResponse(200, userInfo);
  } catch (error) {
    console.error(error);
    return createResponse(500, { error: "Failed to fetch the user" });
  }
};

module.exports = {
  getUserInfoById,
};
