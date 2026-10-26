<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Admin access is decided by the has_role() database function plus RLS; the first signed-up user is auto-granted admin by the signup trigger, so never gate admin in client-only code.
- CVs live in the private "cvs" storage bucket under <user_id>/ folders; admins read them via short-lived signed URLs.
