import { requestPromise } from './statefulRequest';

type VoteIds = {
  csservers: string[];
  cstops: string[];
};

export async function getVoteIds(): Promise<VoteIds> {
  return (
    await requestPromise({
      url: 'https://fleshas.lt/php/api/proxy/voteIds.php?apiKey=' + process.env.PROXY_API_KEY,
      json: true
    })
  ).body;
}
