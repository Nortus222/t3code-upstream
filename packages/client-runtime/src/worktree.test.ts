import type { VcsRef } from "@t3tools/contracts";
import { describe, expect, it } from "vite-plus/test";

import { resolveNewWorktreeBaseBranch } from "./worktree.ts";

const refs: ReadonlyArray<VcsRef> = [
  { name: "release", current: true, isDefault: true, worktreePath: null },
  { name: "dev", current: false, isDefault: false, worktreePath: null },
  { name: "origin/dev", isRemote: true, current: false, isDefault: false, worktreePath: null },
];

describe("resolveNewWorktreeBaseBranch", () => {
  it.each(["dev", "origin/dev"])("restores the selected base %s ahead of release", (branch) => {
    expect(
      resolveNewWorktreeBaseBranch({ refs, rememberedBranch: branch, currentBranch: "release" }),
    ).toBe(branch);
  });

  it.each([null, "deleted", "Dev"])("uses the default when the remembered base is %s", (branch) => {
    expect(
      resolveNewWorktreeBaseBranch({ refs, rememberedBranch: branch, currentBranch: "dev" }),
    ).toBe("release");
  });

  it("falls back to the checkout when there is no default", () => {
    expect(
      resolveNewWorktreeBaseBranch({ refs: [], rememberedBranch: "deleted", currentBranch: "dev" }),
    ).toBe("dev");
  });

  it("leaves projects without a branch unset", () => {
    expect(
      resolveNewWorktreeBaseBranch({ refs: [], rememberedBranch: null, currentBranch: null }),
    ).toBeNull();
  });
});
