type Props = {
  percentage: number;
};
export default function Loading({ percentage }: Props) {
  return (
    <div>
      <h1>Loading</h1>
      <p>{percentage}</p>
    </div>
  );
}
