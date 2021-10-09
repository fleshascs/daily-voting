import fetch, { RequestInit } from 'node-fetch';
import { extend, parseCookies } from './utils';

export type StatefulFetch = (...args: Parameters<typeof fetch>) => ReturnType<typeof fetch>;

export function createStatefulFetch(): StatefulFetch {
  let cookies: string[] = [];
  let referer = '';
  return async (...args: Parameters<typeof fetch>): ReturnType<typeof fetch> => {
    const extraOptions: RequestInit = {
      headers: {
        Referer: referer,
        cookie: parseCookies(cookies)
      }
    };

    if (process.env.FIDDLER_PROXY === 'true') {
      const HttpsProxyAgent = require('https-proxy-agent');
      extraOptions.agent = HttpsProxyAgent('http://127.0.0.1:8888');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    args[1] = args[1] ? extend(extraOptions, args[1]) : extraOptions;

    const response = await fetch(...args);
    const responseHeaders = response.headers.raw();
    if (responseHeaders['set-cookie']) {
      cookies = responseHeaders['set-cookie'];
    }

    if (typeof args[0] === 'string') {
      referer = args[0];
    }

    return response;
  };
}
