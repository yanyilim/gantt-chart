// Available options for REACT_APP_ENV: local, test_server, production
interface configProps {
    hostname: string;
    frontend_port: string;
    backend_port: string;
}

const devConfig = {
    hostname: 'http://localhost',
    frontend_port: '3000',
    backend_port: '3008'
};

const prodConfig = {
    hostname: 'http://192.168.0.24',
    frontend_port: '3000',
    backend_port: '3008'
};

const testProdConfig = {
    hostname: 'http://192.168.0.25',
    frontend_port: '3000',
    backend_port: '3008'
};

let config: configProps;

if (process.env.REACT_APP_ENV === 'production') {
    config = prodConfig;
} else if (process.env.REACT_APP_ENV === 'test_server') {
    config = testProdConfig;
} else {
    config = devConfig;
}
export default config;
