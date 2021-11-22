import { parse } from 'node-html-parser';
import { createHeaders, pipe, retry } from '../utils';
import { SecretData } from './types';
import { parseCaptchaUrl, parseFormData } from './parseHtml';
import { parseCaptcha } from './parseCaptcha';
import { createStatefulRequest, requestPromise } from '../statefulRequest';

export async function vote(...args: Parameters<typeof voteFn>): Promise<void> {
  await retry(() => voteFn(...args));
}

async function voteFn(
  serverId: string,
  opt: Partial<Parameters<typeof requestPromise>[0]> = {}
): Promise<void> {
  const request = createStatefulRequest();
  const res = await request({ url: 'http://cs-servers.lt/vote.php?sid=' + serverId, ...opt });
  const data = pipe<SecretData>({ root: parse(res.body) }, parseCaptchaUrl, parseFormData);

  const captchaImageBuffer = await request({ url: data.captchaUrl, encoding: null });
  data.formData['CAPTCHA_VALUE'] = await parseCaptcha(captchaImageBuffer.body);
  console.log('CAPTCHA_VALUE', data.formData['CAPTCHA_VALUE']);

  const res2 = await request({
    url: 'http://cs-servers.lt/ajax.vote.php',
    method: 'POST',
    headers: createHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: new URLSearchParams(data.formData).toString(),
    ...opt
  });

  if (res2.body.toLowerCase().includes('klaida')) {
    throw new Error(res2.body);
  }

  console.log('res2.body', res2.body);
}
