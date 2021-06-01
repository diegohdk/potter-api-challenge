import getDirFiles from '../../../../common/utils/getDirFiles';

function importRoutes(): any[] {
    const files: string[] = getDirFiles(__dirname);
    const routes: any[] = [];

    files.forEach(async (fileName: string) => {
        const route: any = await import(`./${fileName}`);
        routes.push(route.default);
    });

    return routes;
}

export default importRoutes();