interface MessageChipProps {
  from: string;

  snippet: string;
}
function MessageChip({ from, snippet }: MessageChipProps) {
  return (
    <div className="p-3 border rounded-lg text-white">
      <h1>{from}</h1>
      <p>{snippet}</p>
    </div>
  );
}

export default MessageChip;
