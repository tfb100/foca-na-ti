export async function GET() {
  return Response.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasDbUrl: !!process.env.DATABASE_URL,
    dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 15),
    nodeEnv: process.env.NODE_ENV
  });
}
