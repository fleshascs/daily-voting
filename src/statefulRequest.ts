import request from 'request';
import { extend } from './utils';
import util from 'util';

export const requestPromise = util.promisify(request);

export type StatefulRequest = (
  ...args: Parameters<typeof requestPromise>
) => ReturnType<typeof requestPromise>;

export function createStatefulRequest(): StatefulRequest {
  let cookies: string[] = [];
  let referer = '';
  return async (...args: Parameters<typeof requestPromise>): ReturnType<typeof requestPromise> => {
    const options: Partial<Parameters<typeof requestPromise>[0]> = {
      rejectUnauthorized: false,
      headers: {
        Referer: referer,
        cookie: cookies
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    args[0] = extend(options, args[0]);

    const response = await requestPromise(...args);

    if (response.headers['set-cookie']) {
      cookies = response.headers['set-cookie'];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    referer = args[0].url;

    return response;
  };
}
