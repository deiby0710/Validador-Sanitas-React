module.exports = {
  apps: [
    {
      name: 'Validador-sanitas',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      
      node_args: '--max-old-space-size=5120',
      max_memory_restart: '5500M',
      
      env_production: {
        NODE_ENV: 'production',  // ← Esto hace que cargue .env.production
        PORT: 4000,
      },
      
      watch: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      
      kill_timeout: 5000,
      listen_timeout: 3000
    }
  ]
};