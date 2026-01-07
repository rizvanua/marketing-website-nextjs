/**
 * Helper functions for tag-based revalidation
 * 
 * Use these in API routes or server actions to revalidate pages on-demand
 * when CMS content is updated.
 * 
 * Example API route (app/api/revalidate/route.ts):
 * 
 * ```typescript
 * import { revalidateTag } from 'next/cache';
 * import { CMS_TAGS } from '@/lib/mockCms';
 * 
 * export async function POST(request: Request) {
 *   const { tag } = await request.json();
 *   
 *   if (tag === 'home') {
 *     revalidateTag(CMS_TAGS.HOME);
 *   } else if (tag === 'features') {
 *     revalidateTag(CMS_TAGS.FEATURES);
 *   } else if (tag === 'all') {
 *     revalidateTag(CMS_TAGS.ALL);
 *   }
 *   
 *   return Response.json({ revalidated: true, now: Date.now() });
 * }
 * ```
 * 
 * Then call from your CMS webhook:
 * POST /api/revalidate
 * Body: { "tag": "home" }
 */

export { revalidateTag, revalidatePath } from 'next/cache';
export { CMS_TAGS } from './mockCms';

