interface MessageChipProps {
  from: string;
  id: string;
  snippet: string;
  loading: boolean;
}
function MessageChip({ from, snippet, id, loading }: MessageChipProps) {
  if (loading) {
    return (
      <div className="flex flex-col  space-y-3 justify-center h-full border p-4 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-100 rounded-md w-2/6 "></div>
        <div className="w-5/6 h-8 bg-gray-100 rounded-md "></div>
      </div>
    );
  }
  return (
    <div className="p-4 border rounded-lg text-white">
      <div
        className="m-1 flex flex-row justify-between
       font-bold"
      >
        <div>
          {from} <span>{id}</span>
        </div>
        <div>Tag</div>
      </div>
      <p className="font-light text-sm">{snippet}</p>
    </div>
  );
}

export default MessageChip;
