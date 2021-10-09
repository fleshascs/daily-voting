import { parse } from 'node-html-parser';
import { RequestInit } from 'node-fetch';
import { createHeaders, pipe } from '../utils';
import { createStatefulFetch } from '../statefulFetch';
import { SecretData } from './types';
import { parseCaptchaUrl, parseFormData } from './parseHtml';
import { parseCaptcha } from './parseCaptcha';

export async function vote(serverId: number, opt: RequestInit = {}): Promise<void> {
  const fetch = createStatefulFetch();
  const res = await fetch('http://cs-servers.lt/vote.php?sid=' + serverId, opt);
  const html = await res.text();
  const data = pipe<SecretData>({ root: parse(html) }, parseCaptchaUrl, parseFormData);

  const captcha = await parseCaptcha(fetch, data.captchaUrl);
  data.formData['CAPTCHA_VALUE'] = captcha;

  const res2 = await fetch('http://cs-servers.lt/ajax.vote.php', {
    method: 'POST',
    headers: createHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: new URLSearchParams(data.formData)
  });

  const text2 = await res2.text();
  console.log('text2', text2);
}
