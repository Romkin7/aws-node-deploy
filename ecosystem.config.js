module.exports = {
    apps: [
        {
            name: 'node_deploy_app1',
            script: './build/index.js',
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
        },
    ],
};
