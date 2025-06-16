import { createClient } from 'redis';

const Redis = createClient({
    username: 'default',
    password: 'o1Oxksj23m2fGitxJfuLbhMeL8oHGEyG',
    socket: {
        host: 'redis-12820.c330.asia-south1-1.gce.redns.redis-cloud.com',
        port: 12820
    }
});

Redis.on('error', err => console.log('Redis Client Error', err));
Redis.on('connect', () => console.log('redis client connected'))
await Redis.connect();

export default Redis