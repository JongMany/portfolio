export function getAlignStyle(
  alignDirection: "row" | "col",
  alignReverse?: boolean
) {
  if (alignDirection === "col") {
    return "flex-col";
  }

  if (alignReverse) {
    return "flex-row-reverse";
  }
  return "flex-row";
}
