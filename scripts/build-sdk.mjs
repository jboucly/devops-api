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
        const frontSDKPath = process.env.SDK_PATH;

        if (frontSDKPath) {
            console.log(`${scriptCopyName} Copying SDK to ${frontSDKPath}`);

            const sdkPath = path.join(__dirname, '..', 'dist', 'devops-api-sdk');
            fs.copySync(sdkPath, frontSDKPath);
        } else {
            throw new Error('SDK_PATH is not defined');
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
    await spinner(chalk.gray('Waiting please...'), () => $`node -r dotenv/config dist/common/server/swagger.js`);

    // Remove the previously generated SDK
    console.info(scriptName, chalk.white('Removing previous SDK...'));
    await spinner(chalk.gray('Waiting please...'), () => $`yarn rimraf dist/devops-api-sdk`);

    // Create directory
    console.info(scriptName, chalk.white('Create directory...'));
    await spinner(chalk.gray('Waiting please...'), () => $`mkdir dist/devops-api-sdk`);

    // Generate SDK from swagger spec file
    console.info(scriptName, chalk.white('Generating SDK...'));
    await spinner(
        chalk.gray('Waiting please...'),
        () => $`yarn swagger-typescript-api -p ./swagger-spec.json -o  -n ./dist/devops-api-sdk/devops-api-sdk.ts`
    );

    copySDKToFront();
} catch (e) {
    console.info(chalk.red(`[ Build SDK ] Error: ${e}`));
}
