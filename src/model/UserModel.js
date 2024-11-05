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
        Limit: limit,
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

  static async getTransactionByIdModel({ userId,transactionId }) {
    const resTransaction = await dynamoDB
      .query({
        TableName: "UserTransactions",
        KeyConditionExpression: "userId = :userId and transactionId = :transactionId",
        ExpressionAttributeValues: { ":userId": userId, ":transactionId": transactionId }
      })
      .promise();
      return resTransaction.Items[0]
  }
}

module.exports = {
  UserModel,
};
