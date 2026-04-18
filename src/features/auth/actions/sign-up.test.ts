import { describe, it, expect, vi, beforeEach } from "vitest";
import { signUpAction } from "../actions/sign-up";

// Mock Supabase Server Client
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => Promise.resolve({
    auth: {
      signUp: vi.fn(),
    },
  })),
}));

describe("signUpAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success: true when sign up is successful", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const mockSignUp = vi.fn().mockResolvedValue({ data: { user: {} }, error: null });
    (createClient as any).mockResolvedValue({ auth: { signUp: mockSignUp } });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");
    formData.append("fullName", "Test User");

    const result = await signUpAction(formData);

    expect(result).toEqual({ success: true });
    expect(mockSignUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      options: expect.objectContaining({
        data: { full_name: "Test User" },
      }),
    });
  });

  it("returns error message when validation fails", async () => {
    const formData = new FormData();
    formData.append("email", "invalid-email");
    formData.append("password", "123");
    formData.append("fullName", "");

    const result = await signUpAction(formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
