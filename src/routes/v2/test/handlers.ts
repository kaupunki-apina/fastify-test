import { Static } from '@sinclair/typebox';
import { RouteHandler, RouteGenericInterface } from 'fastify/types/route';
import {
  requestBodySchema,
  responseBodySchema,
  queryStringSchema,
} from './schemas';

interface TestRoute extends RouteGenericInterface {
  Body: Static<typeof requestBodySchema>;
  Querystring: Static<typeof queryStringSchema>;
  Reply: Static<typeof responseBodySchema>;
}

export const testHandler: RouteHandler<TestRoute> = async (req, res) => {
  return res.send({
    ok: false,
    number: req.query.test || 1,
    message: 'Yee buddy',
  });
};
