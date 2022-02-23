import { requestPromise } from '../statefulRequest';

export async function getAgentUrls(): Promise<string[]> {
  return (
    await requestPromise({
      url: 'https://fleshas.lt/php/api/proxy/?apiKey=' + process.env.PROXY_API_KEY,
      json: true
    })
  ).body;
}
