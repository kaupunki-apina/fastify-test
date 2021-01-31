import path from 'path'
import fastify, { FastifyServerOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import autoload from 'fastify-autoload'
import gracefulShutdown from 'fastify-graceful-shutdown';
import { docs } from './docs';


export function build(opts: FastifyServerOptions) {
  const app = fastify(opts);
  app.register(gracefulShutdown);
  app.register(fastifyPlugin(docs));
  app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/,
    options: { prefix: '/api' }
  });

  app.ready(err => {
    if (err) throw err;
    // Builds docs
    app.swagger();
  });

  return app;
}
