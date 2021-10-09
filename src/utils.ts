export function pipe<T>(...fns: [T, ...Array<(arg?: T) => T>]): T {
  const initialValue = fns[0];
  fns.shift();
  return (fns as Array<(arg?: T) => T>).reduce((state, fn) => fn(state), initialValue);
}

export function parseCookies(raw: string[]): string {
  return raw
    .map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(';');
}

type Constrained<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? Constrained<T[K]>
    : T[K] extends string | number
    ? T[K]
    : never;
};

export function extend<D extends Constrained<D>>(destination: D, source: D): D {
  for (const property in source) {
    if (
      destination[property] &&
      typeof destination[property] == 'object' &&
      // destination[property].toString() == '[object Object]' &&
      source[property]
    )
      extend(destination[property], source[property]);
    else destination[property] = source[property];
  }
  return destination;
}

export function createHeaders(extraHeaders = null) {
  const defaultHeaders = {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9,lt;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36'
  };

  return extraHeaders ? extend(defaultHeaders, extraHeaders) : defaultHeaders;
}
