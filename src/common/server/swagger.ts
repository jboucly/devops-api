import { writeFileSync } from 'fs';
import { isNil } from 'lodash';

import { ConstructApp } from './construct-app';

// ------ GENERATE SWAGGER SPEC JSON FILE ------

const SWAGGER_SPEC_FILE = './swagger-spec.json';

async function run(): Promise<void> {
    const { document, app } = await ConstructApp();
    app.close();

    if (isNil(document)) {
        process.exit(2);
    }

    /**
     * Delete undefined paths
     */
    const undefinedPaths = document.paths['undefined'];
    if (undefinedPaths) {
        delete document.paths['undefined'];
    }
    try {
        await writeFileSync(SWAGGER_SPEC_FILE, JSON.stringify(document));
        process.exit(0);
    } catch (error) {
        process.emit('warning', new Error(`Impossible de générer le fichier ${SWAGGER_SPEC_FILE}`));
        process.exit(2);
    }
}

run();
