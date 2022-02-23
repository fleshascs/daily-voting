import { requestPromise } from '../statefulRequest';

export async function getAgentUrls(): Promise<string[]> {
  return (await requestPromise({ url: 'https://fleshas.lt/php/api/proxy/?apiKey=123', json: true }))
    .body;
}
