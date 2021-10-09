import { createHeaders } from '../utils';
import { createStatefulFetch } from '../statefulFetch';
import { RequestInit } from 'node-fetch';

export async function vote(
  serverIp: string,
  proxyIp: string,
  opt: RequestInit = {}
): Promise<void> {
  const fetch = createStatefulFetch();
  const res = await fetch('https://cstops.lt/js/rate/jRating.php', {
    method: 'POST',
    headers: createHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Referer: `https://cstops.lt/serverinfo.php?ip=${serverIp}&g=cs16`,
      Origin: 'https://cstops.lt'
    }),
    body: new URLSearchParams({
      idBox: '5',
      rate: '10',
      action: 'rating',
      ip: serverIp,
      visitor: proxyIp
    }),
    ...opt
  });

  const text = await res.text();
  console.log('text', text);
}
