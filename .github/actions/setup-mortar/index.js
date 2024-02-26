const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {

    try {
        // Download the specific version of the tool, e.g. as a tarball/zipball
        // TODO: https://ohouse.atlassian.net/browse/COREPL-1482 get latest version
        const pathToTarball = await tc.downloadTool('https://nexus.co-workerhou.se/repository/raw-tool-releases/homebrew/platform/mortar/1.6.2/mortar_Linux_x86_64.tar.gz');

        // Extract the tarball onto the runner
        const pathToCLI = await tc.extractTar(pathToTarball);

        // Expose the tool by adding it to the PATH
        const path = core.addPath(pathToCLI)
        console.log(`Added ${pathToCLI} to PATH: ${path}`);
    } catch (e) {
        core.setFailed(e);
    }
}

module.exports = setup

if (require.main === module) {
    setup();
}
