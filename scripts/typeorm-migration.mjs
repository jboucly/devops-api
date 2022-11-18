#!/usr/bin/env zx
import 'zx/globals';

/** ############################## DEFINE ATTRIBUTES ############################## */

let name;
const scriptName = chalk.cyan('[ MIGRATION ] ');

/** ############################## DEFINE FUNCTIONS ############################## */

function checkArgvExist(arg) {
    if (argv[arg] === undefined) {
        throw new Error(`Please, specify the ${arg} of the migration`);
    }
    name = argv[arg];
}

function runMigration() {
    console.info(scriptName, chalk.white('Running migration...'));
    $`yarn ts-node --transpile-only -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d src/config/orm.cli.config.ts`;
}

/** ################################# SCRIPT ################################## */

checkArgvExist('type');

try {
    switch (argv.type) {
        case 'run':
            runMigration();
            break;
        case 'revert':
            console.info(scriptName, chalk.white('Reverting migration...'));
            $`yarn ts-node --transpile-only -r tsconfig-paths/register node_modules/typeorm/cli.js migration:revert -d src/config/orm.cli.config.ts`;
            break;
        case 'generate':
            checkArgvExist('name');
            $`yarn ts-node --transpile-only -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -d src/config/orm.cli.config.ts -n ${name}`;
            break;
        case 'create':
            checkArgvExist('name');
            $`yarn ts-node --transpile-only -r tsconfig-paths/register node_modules/typeorm/cli.js migration:create src/migrations/${name}`;
            break;
        default:
            runMigration();
            break;
    }
} catch (error) {
    console.info(chalk.red(`[ MIGRATION ] Error: ${error}`));
}
