export function fetchProxies(): Promise<any[]> {
  return Promise.resolve([
    {
      protocols: ['socks4'],
      ipAddress: '78.61.27.207',
      port: 5678
    },
    {
      protocols: ['socks4'],
      ipAddress: '88.119.204.62',
      port: 4153
    },
    {
      protocols: ['socks4'],
      ipAddress: '85.206.57.202',
      port: 4145
    },
    {
      protocols: ['socks4'],
      ipAddress: '178.19.28.157',
      port: 5678
    },
    {
      protocols: ['socks4'],
      ipAddress: '213.226.177.153',
      port: 5678
    },
    {
      protocols: ['socks4'],
      ipAddress: '5.20.91.12',
      port: 50624
    }
  ]);
}
