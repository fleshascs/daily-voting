import { parse } from 'node-html-parser';
import { RequestInit } from 'node-fetch';
import { createHeaders, pipe, retry } from '../utils';
import { createStatefulFetch } from '../statefulFetch';
import { SecretData } from './types';
import { parseCaptchaUrl, parseFormData } from './parseHtml';
import { parseCaptcha } from './parseCaptcha';

export function vote(...args: Parameters<typeof voteFn>): Promise<ReturnType<typeof voteFn>> {
  return retry(() => voteFn(...args));
}

async function voteFn(serverId: string, opt: RequestInit = {}): Promise<void> {
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
  if (text2.toLowerCase().includes('klaida')) {
    throw new Error(text2);
  }
}
