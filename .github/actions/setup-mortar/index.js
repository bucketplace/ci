const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {

    try {
        // Download the specific version of the tool, e.g. as a tarball/zipball
        const pathToTarball = await tc.downloadTool('https://nexus.co-workerhou.se/repository/raw-tool-releases/homebrew/platform/mortar/2.1.0/mortar_Linux_x86_64.tar.gz');

        // Extract the tarball onto the runner
        const pathToCLI = await tc.extractTar(pathToTarball);

        // Expose the tool by adding it to the PATH
        core.addPath(pathToCLI)
    } catch (e) {
        core.setFailed(e);
    }
}

module.exports = setup

if (require.main === module) {
    setup();
}
