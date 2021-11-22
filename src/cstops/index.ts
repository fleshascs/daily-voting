import { createHeaders } from '../utils';
import { createStatefulRequest, requestPromise } from '../statefulRequest';

export async function vote(
  serverIp: string,
  opt: Partial<Parameters<typeof requestPromise>[0]> = {}
): Promise<void> {
  const request = createStatefulRequest();
  const res = await request({ url: 'https://api.ipify.org?format=json', json: true, ...opt });
  // console.log('1res.body.ip', res.body.ip);
  // const res3 = await request({ url: 'https://api.ipify.org?format=json', json: true, ...opt });
  // console.log('2res.body.ip', res3.body.ip);
  const res2 = await request({
    url: 'https://cstops.lt/js/rate/jRating.php',
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
      visitor: res.body.ip
    }).toString(),
    json: true,
    ...opt
  });

  console.log('body', res2.body);
}
