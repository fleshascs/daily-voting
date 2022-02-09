import { vote as voteCsServers } from './cs-servers';
import { vote as voteCsTops } from './cstops';
import { getAgentUrls } from './proxy/getAgentUrls';

const voteIds = {
  csservers: ['73348'], // http://cs-servers.lt/vote.php?sid=73348
  cstops: ['91.225.107.149:27016', '91.225.107.149:27019'] // ['cs.fleshas.lt:27015'] // https://cstops.lt/serverinfo.php?ip=cs.fleshas.lt:27015&g=cs16
};

export const vote = async (): Promise<string> => {
  const agentUrls = getAgentUrls(1);

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
