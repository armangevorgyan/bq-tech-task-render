import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({error: 'Method Not Allowed'}, {status: 405});
  }

  try {
    const body = await req.json();
    const paths = Array.isArray(body.path) ? body.path : [body.path || '/', '/notion']; // Default paths

    // Iterate through each path to purge its cache
    for (const singlePath of paths) {
      const response = await fetch(`https://api.vercel.com/v2/invalidate?teamId=${process.env.VERCEL_TEAM_ID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: singlePath, // Purge cache for each path
          projectId: process.env.VERCEL_PROJECT_ID
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to purge cache for path: ${singlePath}`);
      }
    }

    return NextResponse.json({message: 'Cache purged successfully for all paths'});
  } catch (err) {
    return NextResponse.json({error: (err as Error).message}, {status: 500});
  }
}
