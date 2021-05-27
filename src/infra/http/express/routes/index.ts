import { Router } from 'express';
import getDirFiles from '../../../../common/utils/getDirFiles';

function importRoutes(): Router {
    const routes: string[] = getDirFiles(__dirname);
    const router: Router = Router();

    routes.forEach(async (route: string) => {
        const fn = (await import(`./${route}`)).default;
        fn(router);
    });

    return router;
}

export default importRoutes();