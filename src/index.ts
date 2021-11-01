import { vote as voteCsServers } from './cs-servers';
import { vote as voteCsTops } from './cstops';
import { fetchProxies } from './fetchProxies';
import { getAgent } from './agent';

export const handler = async (): Promise<string> => {
  const proxies = await fetchProxies();
  console.log('proxies', proxies);

  const tasks = proxies.reduce<Array<Promise<void>>>((tasksList, proxy) => {
    const agent = getAgent(proxy.protocols[0], proxy.ipAddress, proxy.port);
    const csTops = ['cs.fleshas.lt:27015'].map((id) => voteCsTops(id, proxy.ipAddress, { agent }));
    const csServers = ['73352'].map((id) => voteCsServers(id, { agent }));
    return tasksList.concat(csTops, csServers);
  }, []);

  const results = await Promise.allSettled(tasks);

  return JSON.stringify(results);
};

// import { vote as voteCsServers } from './cs-servers';

// export const handler = async (): Promise<string> => {
//   const results = await Promise.allSettled(['73352'].map((id) => voteCsServers(id)));
//   return JSON.stringify(results);
// };
