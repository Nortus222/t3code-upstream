import { scopeProjectRef } from "@t3tools/client-runtime/environment";
import { EnvironmentId, ProjectId, type ScopedProjectRef } from "@t3tools/contracts";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vite-plus/test";

const project = scopeProjectRef(EnvironmentId.make("env-a"), ProjectId.make("project-a"));

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

it("restores the last selected base across mounts without leaking to another project or environment", async () => {
  const entries = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, value),
      removeItem: (key: string) => entries.delete(key),
    },
    dispatchEvent: () => true,
  });
  let usePreference = (await import("./worktreePreferences")).useLastWorktreeBaseBranch;
  let selectBranch: (branch: string) => void = () => {};
  function Composer({ projectRef }: { projectRef: ScopedProjectRef }) {
    const [branch, setBranch] = usePreference(projectRef);
    selectBranch = setBranch;
    return <span>{branch ?? "unset"}</span>;
  }

  expect(renderToString(<Composer projectRef={project} />)).toBe("<span>unset</span>");
  selectBranch("dev");
  vi.resetModules();
  usePreference = (await import("./worktreePreferences")).useLastWorktreeBaseBranch;
  expect(renderToString(<Composer projectRef={project} />)).toBe("<span>dev</span>");
  expect(
    renderToString(
      <Composer projectRef={scopeProjectRef(project.environmentId, ProjectId.make("project-b"))} />,
    ),
  ).toBe("<span>unset</span>");
  expect(
    renderToString(
      <Composer projectRef={scopeProjectRef(EnvironmentId.make("env-b"), project.projectId)} />,
    ),
  ).toBe("<span>unset</span>");
});
