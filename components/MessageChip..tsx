interface MessageChipProps {
  from: string;
  id: string;
  snippet: string;
  loading: boolean;
  subject: string;
  mimType: string;
  onclick: React.MouseEventHandler<HTMLDivElement>;
  tag: string;
}
function MessageChip({
  from,
  snippet,
  loading,
  subject,
  onclick,
  tag,
}: MessageChipProps) {
  if (loading) {
    return (
      <div className="flex flex-col  space-y-3 justify-center h-full border p-4 rounded-lg animate-pulse ">
        <div className="h-6 bg-gray-100 rounded-md w-2/6 "></div>
        <div className="w-5/6 h-8 bg-gray-100 rounded-md "></div>
      </div>
    );
  }
  return (
    <div
      onClick={onclick}
      className="p-4 border text-sm rounded-lg md:text-base  hover:cursor-pointer"
    >
      <div
        className=" flex flex-row justify-between
       font-bold"
      >
        <div>{from}</div>
        <div>{tag}</div>
      </div>
      <p className="font-light text-xs md:text-sm">{snippet}</p>
    </div>
  );
}

export default MessageChip;
