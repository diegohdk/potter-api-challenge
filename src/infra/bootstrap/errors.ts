import die from '../../common/utils/errors';

process.stdin.resume();

//do something when app is closing
process.on('SIGTERM', () => die('SIGTERM', true));

//catches ctrl+c event
process.on('SIGINT', () => die('SIGINT', true));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => die('SIGUSR1', true));
process.on('SIGUSR2', () => die('SIGUSR2', true));