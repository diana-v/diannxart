import { defineConfig } from 'checkly';
import { Frequency } from 'checkly/constructs';

export default defineConfig({
    projectName: 'Diann X Art',
    logicalId: 'diann-x-art',
    repoUrl: 'https://github.com/diana-v/diannxart',
    checks: {
        activated: true,
        muted: false,
        runtimeId: '2022.10',
        frequency: Frequency.EVERY_5M,
        locations: ['us-east-1', 'eu-west-1'],
        tags: ['website', 'api'],
        checkMatch: '**/__checks__/**/*.check.ts',
        ignoreDirectoriesMatch: [],
        browserChecks: {
            frequency: Frequency.EVERY_10M,
            testMatch: '**/__checks__/**/*.spec.ts',
        },
    },
    cli: {
        runLocation: 'eu-west-1',
    },
});
