import { readdirSync } from 'fs';

export default function getDirFiles(path: string): string[] {
    return readdirSync(path)
        .filter((file: string) => !/^(\.|index)/.test(file))
        .map((file: string) => file.replace(/\.[tj]s$/, ''));
}