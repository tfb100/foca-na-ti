import { describe, it, expect, vi, beforeEach } from "vitest";
import { signInAction } from "../actions/sign-in";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => Promise.resolve({
    auth: {
      signInWithPassword: vi.fn(),
    },
  })),
}));

describe("signInAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success: true when sign in is successful", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const mockSignIn = vi.fn().mockResolvedValue({ data: { user: {} }, error: null });
    (createClient as any).mockResolvedValue({ auth: { signInWithPassword: mockSignIn } });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");

    const result = await signInAction(formData);

    expect(result).toEqual({ success: true });
    expect(mockSignIn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("handles invalid credentials error", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const mockSignIn = vi.fn().mockResolvedValue({ 
      data: { user: null }, 
      error: { message: "Invalid login credentials" } 
    });
    (createClient as any).mockResolvedValue({ auth: { signInWithPassword: mockSignIn } });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "wrong");

    const result = await signInAction(formData);

    expect(result.success).toBe(false);
    expect(result.error).toBe("E-mail ou senha incorretos.");
  });
});
