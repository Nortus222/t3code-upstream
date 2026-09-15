# Message composer

Messages can contain up to 120,000 characters. If a draft is longer, T3 Code keeps it in the
composer and shows how many characters need to be removed. Shorten the draft or split it into
multiple messages, then send again in the same thread.

## Worktree base branch

In Settings → General, choose **New worktree** under **New threads** to see the worktree defaults.
Set **Worktree base branch** to **Last used** to reuse the base branch you last selected for that
project in that environment. The selection is remembered on this device after you send the
message or restart the app. **Default branch** keeps using the repository's default branch.

**Start from origin** still controls whether the worktree starts from the matching remote branch.
For example, selecting `dev` with **Last used** and **Start from origin** enabled makes the next
new worktree start from `origin/dev`, even if the repository's default branch is `release`.

Existing drafts keep their selected branch. If there is no remembered selection or the branch
has been deleted, T3 Code uses the default branch, or the current checkout if no default is known.
