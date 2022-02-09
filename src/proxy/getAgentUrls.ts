export function getAgentUrls(num: number): string[] {
  const proxies = [];
  for (let index = 0; index < num; index++) {
    const session_id = (1000000 * Math.random()) | 0;
    proxies.push(getAgent(session_id));
  }

  return proxies;
}

export function getAgent(session_id: number): string {
  return (
    'http://session-' + session_id + ':' + process.env.PROXY_API_KEY + '@' + process.env.PROXY_URL
  );
}
