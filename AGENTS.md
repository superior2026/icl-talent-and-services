## Architecture

- Admin access is decided by the `has_role()` database function plus RLS; the first signed-up user is auto-granted admin by the signup trigger, so never gate admin in client-only code.
- CVs live in the private `cvs` storage bucket under `<user_id>/` folders; admins read them via short-lived signed URLs.
