import type { VcsRef } from "@t3tools/contracts";

/** Chooses a fresh worktree's base from validated refs, then the current checkout. */
export function resolveNewWorktreeBaseBranch(input: {
  refs: ReadonlyArray<VcsRef>;
  rememberedBranch: string | null;
  currentBranch: string | null;
}): string | null {
  return (
    input.refs.find((ref) => ref.name === input.rememberedBranch)?.name ??
    input.refs.find((ref) => ref.isDefault)?.name ??
    input.currentBranch
  );
}
