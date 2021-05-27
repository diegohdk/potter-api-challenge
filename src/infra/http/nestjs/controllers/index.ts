import getDirFiles from '../../../../common/utils/getDirFiles';

function importRoutes(): any[] {
    const routes: string[] = getDirFiles(__dirname);
    return routes.map((route: string) => require(`./${route}`).default);
}

export default importRoutes();