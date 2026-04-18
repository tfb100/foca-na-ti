import { describe, it, expect, vi, beforeAll } from "vitest";

// Mock the postgres driver with enough surface area for drizzle-orm to initialize
vi.mock("postgres", () => {
  const mockClient = Object.assign(
    vi.fn(() => Promise.resolve([])),
    {
      end: vi.fn(),
      unsafe: vi.fn(),
      options: {
        parsers: {},
        serializers: {},
      },
      subscribe: vi.fn(),
      listen: vi.fn(),
      notify: vi.fn(),
      begin: vi.fn(),
      file: vi.fn(),
    }
  );
  return { default: vi.fn(() => mockClient) };
});

describe("Drizzle DB client", () => {
  beforeAll(() => {
    process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/testdb";
  });

  it("exports the db instance without throwing", async () => {
    const { db } = await import("@/lib/db");
    expect(db).toBeDefined();
  });

  it("db instance has query property (relational queries enabled)", async () => {
    const { db } = await import("@/lib/db");
    expect(db.query).toBeDefined();
  });
});
