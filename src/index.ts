import { vote as voteCsServers } from './cs-servers';
import { vote as voteCsTops } from './cstops';
import { getAgentUrls } from './proxy/getAgentUrls';

export const handler = async (): Promise<string> => {
  const agentUrls = getAgentUrls(1);

  const tasks = agentUrls.reduce<Array<Promise<void>>>((tasksList, agentUrl) => {
    // if (process.env.FIDDLER_PROXY === 'true') {
    // agentUrl = 'http://127.0.0.1:8888';
    // }

    const csTops = ['185.80.128.244:27019'].map((id) => voteCsTops(id, { proxy: agentUrl }));
    const csServers = ['73348'].map((id) => voteCsServers(id, { proxy: agentUrl }));
    return tasksList.concat(csTops, csServers);
  }, []);

  const results = await Promise.allSettled(tasks);

  return JSON.stringify(results);
};

//handler();
