import { Hono } from "hono";
import { handle } from "hono/vercel";
import { clerkMiddleware } from '@hono/clerk-auth'

import authors from './autors';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.use(clerkMiddleware());

app.route('/authors', authors);
    
export const GET = handle(app);
export const POST = handle(app);