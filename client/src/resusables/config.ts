const setServerPath = window.location.host === 'localhost:8080' ? 'http://localhost:3000' : 'https://sanden.usermd.net';

const config = {
    nestApiPath: setServerPath
}

export default config;