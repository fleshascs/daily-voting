import { vote as voteCsServers } from './cs-servers';
import { vote as voteCsTops } from './cstops';
import { getVoteIds } from './getVoteIds';
import { getAgentUrls } from './proxy/getAgentUrls';

export const vote = async (): Promise<string> => {
  const agentUrls = await getAgentUrls();
  const voteIds = await getVoteIds();

  const tasks = agentUrls.reduce<Array<Promise<void>>>((tasksList, agentUrl) => {
    // if (process.env.FIDDLER_PROXY === 'true') {
    // agentUrl = 'http://127.0.0.1:8888';
    // }
    const csTops = voteIds.cstops.map((id) => voteCsTops(id, { proxy: agentUrl }));
    const csServers = voteIds.csservers.map((id) => voteCsServers(id, { proxy: agentUrl }));
    return tasksList.concat(csTops, csServers);
  }, []);

  const results = await Promise.allSettled(tasks);

  return JSON.stringify(results);
};
