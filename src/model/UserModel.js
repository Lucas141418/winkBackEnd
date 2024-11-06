const aws = require("aws-sdk");

const dynamoDB = new aws.DynamoDB.DocumentClient();

class UserModel {
  static async getUserInfoByIdModel({ userId }) {
    const resultUser = await dynamoDB
      .get({
        TableName: "Users",
        Key: { userId },
      })
      .promise();

    return resultUser.Item;
  }

  static async getTransactionsModel({ userId, limit, lastEvaluatedKey }) {
    const resTransaction = await dynamoDB
      .query({
        TableName: "UserTransactions",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
        Limit: parseInt(limit),
        ExclusiveStartKey: lastEvaluatedKey
          ? JSON.stringify(lastEvaluatedKey)
          : undefined,
        ScanIndexForward: false,
      })
      .promise();

    return {
      item: resTransaction.Items,
      lastEvaluatedKey: resTransaction.LastEvaluatedKey || undefined,
    };
  }

  static async getTransactionByIdModel({ userId, transactionId }) {
    const resTransaction = await dynamoDB
      .query({
        TableName: "UserTransactions",
        KeyConditionExpression:
          "userId = :userId and transactionId = :transactionId",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":transactionId": transactionId,
        },
      })
      .promise();
    return resTransaction.Items[0];
  }

  static async createTransactionModel({ newTransaction }) {
    const resTransaction = await dynamoDB
      .put({
        TableName: "UserTransactions",
        Item: newTransaction,
      })
      .promise();

    return  {data: resTransaction};
  }

  static async updateBalanceModel({ userId, amountTransaction }) {
    const resUpdateBalance = await dynamoDB
      .update({
        TableName: "Users",
        Key: { userId },
        UpdateExpression: "SET balance = balance - :amountTransaction",
        ExpressionAttributeValues: { ":amountTransaction": amountTransaction },
        ConditionExpression: "attribute_exists(userId) and balance > :amountTransaction",
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {updatedBalance: resUpdateBalance.Attributes};
  }
}

module.exports = {
  UserModel,
};

