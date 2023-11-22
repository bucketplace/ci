const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const axios = require('axios');
const nexusUrl = 'https://nexus.co-workerhou.se/repository/raw-tool-releases/homebrew/platform/mortar/';

async function setup() {

    try {
        // Download the specific version of the tool, e.g. as a tarball/zipball
        // const download = getDownloadObject(version); //TODO: mocking the download object for now
        // const pathToTarball = await tc.downloadTool('https://nexus.co-workerhou.se/repository/raw-tool-releases/homebrew/platform/mortar/2.1.0/mortar_Linux_x86_64.tar.gz');
        const pathToTarball = await tc.downloadTool(getLatestVersion());

        // Extract the tarball onto the runner
        const pathToCLI = await tc.extractTar(pathToTarball);

        // Expose the tool by adding it to the PATH
        core.addPath(pathToCLI)
    } catch (e) {
        core.setFailed(e);
    }
}

async function getLatestVersion() {
    try {
        // Nexus API를 통해 버전 목록 가져오기
        const response = await axios.get(nexusUrl);
        const versions = response.data.items.map(item => item.version);

        // 버전들을 정렬하여 가장 최신 버전 가져오기
        const latestVersion = versions.sort().pop();

        console.log('Latest Version:', latestVersion);

        // 이제 필요한 URL을 생성하여 사용할 수 있습니다.
        const downloadUrl = `${nexusUrl}${latestVersion}/mortar_Linux_x86_64.tar.gz`;
        console.log('Download URL:', downloadUrl);

        return downloadUrl;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = setup

if (require.main === module) {
    setup();
}
