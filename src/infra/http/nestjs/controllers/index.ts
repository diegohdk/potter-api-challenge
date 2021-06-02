import getDirFiles from '../../../../common/utils/getDirFiles';

function importRoutes(): any[] {
    const files: string[] = getDirFiles(__dirname);

    return files.map((fileName: string) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`./${fileName}`).default;
    });
}

export default importRoutes();