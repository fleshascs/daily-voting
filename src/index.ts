import SocksProxyAgent from 'socks-proxy-agent';
import { vote as voteCsServers } from './cs-servers';
import { vote as voteCsTops } from './cstops';
import { fetchProxies } from './fetchProxies';
import HttpsProxyAgent from 'https-proxy-agent';
const fs = require('fs');

(async () => {
  const proxies = await getProxies();
  console.log('proxies', proxies);

  proxies.forEach(async (proxy) => {
    const agent = getAgent(proxy.protocols[0], proxy.ipAddress, proxy.port);

    console.log('proxy start fetch', proxy.ipAddress);

    const csTops = ['cs.fleshas.lt:27015'].map((serverIp) =>
      voteCsTops(serverIp, proxy.ipAddress, { agent })
    );

    const csServers = [73352].map((serverId) => voteCsServers(serverId, { agent }));
    console.log(await Promise.allSettled([...csTops, ...csServers]));

    console.log('proxy end of fetch', proxy.ipAddress);
  });
})();

function getAgent(protocol: string, ip: string, port: string) {
  protocol = protocol ? protocol.toLowerCase() : 'http';
  const url = `${protocol}://${ip}:${port}`;
  return protocol === 'http' ? HttpsProxyAgent(url) : SocksProxyAgent(url);
}

async function getProxies() {
  const proxieFile = __dirname + '/proxies.json';
  let proxies = [];
  try {
    proxies = JSON.parse(fs.readFileSync(proxieFile));
  } catch {}
  if (!proxies?.length) {
    console.log('fetching proxies...');
    proxies = await fetchProxies();
    console.log('fetch proxies', proxies);
    fs.writeFileSync(proxieFile, JSON.stringify(proxies));
  }
  return proxies;
}
