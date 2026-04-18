import { describe, it, expect, beforeAll } from "vitest";

describe("Supabase browser client", () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "eyJtest.key.value";
  });

  it("createClient returns a client object without throwing", async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const client = createClient();
    expect(client).toBeDefined();
  });

  it("client exposes auth namespace", async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const client = createClient();
    expect(client.auth).toBeDefined();
  });
});
