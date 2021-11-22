import SocksProxyAgent from 'socks-proxy-agent';
import HttpsProxyAgent from 'https-proxy-agent';

export function getAgent(
  protocol: string,
  ip: string,
  port: number
): HttpsProxyAgent.HttpsProxyAgent | SocksProxyAgent.SocksProxyAgent {
  protocol = protocol ? protocol.toLowerCase() : 'http';
  const url = `${protocol}://${ip}:${port}`;
  return ['http', 'https'].includes(protocol) ? HttpsProxyAgent(url) : SocksProxyAgent(url);
}
