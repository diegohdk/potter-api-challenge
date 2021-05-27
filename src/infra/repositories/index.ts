import * as ReposMongoDB from './mongodb';
import * as ReposInMemory from './inmemory';

let repos;

if (process.env.DB === 'mongodb') {
    repos = ReposMongoDB;
} else if (process.env.DB === 'inmemory') {
    repos = ReposInMemory;
}

export default repos;