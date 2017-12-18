module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'kos-oss',
      script    : '/server/client.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
  /*  {
      name      : 'WEB',
      script    : 'web.js'
    }  */
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'koas',
      host : '120.78.221.130',
      ref  : 'origin/master',
      repo : 'git@github.com:winssps/koa-oss.git',
      path : '/home/koas/www/aliyun-oss',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
