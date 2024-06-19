interface MessageChipProps {
  from: string;
  id: string;
  snippet: string;
  subject: string;
  mimType: string;

  tag: string;
}
function MessageChip({
  from,
  snippet,

  subject,

  tag,
}: MessageChipProps) {
  return (
    <div className="p-4 border text-sm rounded-lg md:text-base  hover:cursor-pointer">
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
