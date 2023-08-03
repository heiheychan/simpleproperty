export function metricsCalculator(data) {
  let income = 0;
  let expense = 0;

  data.forEach((element) => {
    if (element.transaction_type === "income") {
      income += element.amount;
    } else {
      expense += element.amount;
    }
  });

  return [income, expense, income - expense];
}
