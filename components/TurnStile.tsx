import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
const key: any = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY;
console.log(key);
function TurnStile() {
  const [token, setToken] = useState<string | null>(null);
  return (
    <Turnstile
      //   onSuccess={(token) => {
      //     setToken(token);
      //   }}
      siteKey={key}
    />
  );
}

export default TurnStile;
