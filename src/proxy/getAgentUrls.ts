export function getAgentUrls(num: number): string[] {
  const proxies = [];
  for (let index = 0; index < num; index++) {
    const session_id = (1000000 * Math.random()) | 0;
    proxies.push(getAgent(session_id));
  }

  return proxies;
}

export function getAgent(session_id: number): string {
  const apiKey = '123';
  return (
    'http://scraperapi.session_number=' +
    session_id +
    ':' +
    apiKey +
    '@proxy-server.scraperapi.com:8001'
  );
}
