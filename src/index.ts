import { vote as voteCsServers } from './cs-servers';
import { vote as voteCsTops } from './cstops';
import { fetchProxies } from './fetchProxies';
import { getAgent } from './agent';
const fs = require('fs');

(async () => {
  const proxies = await getProxies();
  console.log('proxies', proxies);

  proxies.forEach(async (proxy) => {
    console.log('proxy start fetch', proxy.ipAddress);

    const agent = getAgent(proxy.protocols[0], proxy.ipAddress, proxy.port);
    const csTops = ['cs.fleshas.lt:27015'].map((id) => voteCsTops(id, proxy.ipAddress, { agent }));
    const csServers = ['73352'].map((id) => voteCsServers(id, { agent }));

    console.log(await Promise.allSettled([...csTops, ...csServers]));
    console.log('proxy end of fetch', proxy.ipAddress);
  });
})();

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
