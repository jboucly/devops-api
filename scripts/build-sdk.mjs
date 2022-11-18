#!/usr/bin/env zx
import 'zx/globals';

import { config as SetupDotenv } from 'dotenv';
import { spinner } from 'zx/experimental';

/** ############################## DEFINE ATTRIBUTES ############################## */

SetupDotenv();
const enter = () => console.log('\n');
const scriptName = chalk.cyan('[ Build SDK ] ');
const scriptCopyName = chalk.cyan('[ Copy SDK ] ');

/** ############################## DEFINE FUNCTIONS ############################## */

function copySDKToFront() {
    if (argv.copy) {
        const frontSDKPath = process.env.FRONT_SDK_PATH;

        if (frontSDKPath) {
            console.log(`${scriptCopyName} Copying SDK to ${frontSDKPath}`);

            const sdkPath = path.join(__dirname, '..', 'dist', 'client-api-sdk');
            fs.copySync(sdkPath, frontSDKPath);
        } else {
            throw new Error('FRONT_SDK_PATH is not defined');
        }
    }
}

/** ################################# SCRIPT ################################## */

try {
    enter();
    console.info(scriptName, chalk.white('Building project...'));
    await spinner(chalk.gray('Waiting please...'), () => $`yarn build`);

    // Build swagger specs
    console.info(scriptName, chalk.white('Creating swagger spec file...'));
    await spinner(chalk.gray('Waiting please...'), () => $`node -r dotenv/config dist/src/main/swagger.js`);

    // Remove the previously generated SDK
    console.info(scriptName, chalk.white('Removing previous SDK...'));
    await spinner(chalk.gray('Waiting please...'), () => $`yarn rimraf dist/client-api-sdk`);

    // Generate SDK from swagger spec file
    console.info(scriptName, chalk.white('Generating SDK...'));
    await spinner(chalk.gray('Waiting please...'), () => $`openapi-generator-cli generate`);

    copySDKToFront();
} catch (e) {
    console.info(chalk.red(`[ Build SDK ] Error: ${e}`));
}
