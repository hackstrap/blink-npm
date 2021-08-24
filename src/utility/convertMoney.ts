export default function convertMoney(money: number) {
  if (typeof money !== "number") return "NA";

  if (money < 1000) return `$${money}k`;
  if ((money / 1000) < 1000) return `$${money / 1000}M`;
  if ((money / 1000000) < 1000) return `$${money / 1000000}B`;
  if ((money / 1000000000) < 1000) return `$${money / 1000000000}T`;

  return `$${money}k`
}
