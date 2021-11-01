import SocksProxyAgent from 'socks-proxy-agent';
import HttpsProxyAgent from 'https-proxy-agent';

export function getAgent(protocol: string, ip: string, port: number) {
  protocol = protocol ? protocol.toLowerCase() : 'http';
  const url = `${protocol}://${ip}:${port}`;
  return protocol === 'http' ? HttpsProxyAgent(url) : SocksProxyAgent(url);
}
