function transactionValidation(transaction) {
  let validationMessage = "";

  if (typeof transaction.detailsTransaction !== "string") {
    validationMessage += "1. detailsTransaction must be a string.   ";
  }
  if (
    !transaction.recipientPhone ||
    typeof transaction.recipientPhone !== "string"
  ) {
    validationMessage +=
      "2. Must have a recipientPhone and it should be a string.  ";
  }
  if (!transaction.userId || typeof transaction.userId !== "string") {
    validationMessage += "3. Must have a userId and it should be a string.  ";
  }
  if (typeof transaction.amount !== "number" || transaction.amount <= 0) {
    validationMessage +=
      "4. Must have an amount and it should be greater than 0.    ";
  }
  if (
    !transaction.recipientName ||
    typeof transaction.recipientName !== "string"
  ) {
    validationMessage +=
      "5. Must have a recipientName and it should be a string.     ";
  }

  return validationMessage ? validationMessage : true;
}

module.exports = {
  transactionValidation,
};
