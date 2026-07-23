# Rebuild — lift & bodyweight tracker

A personal, installable web app (PWA) for tracking workouts and bodyweight against a recomposition plan. Works offline; syncs to your own Supabase across devices.

## Files
- `index.html` — the entire app (self-contained; icon embedded).
- `sw.js` — service worker so the installed app opens with no signal (e.g. at the gym).

No build step. No dependencies to install. It's static.

## Deploy on GitHub Pages (permanent URL, free)
1. Create a new repo (e.g. `rebuild`). Public is fine — there are **no secrets in this code** (your Supabase keys are entered inside the app and stored in your browser, never in the repo).
2. Upload `index.html` and `sw.js` to the repo root (drag-drop in the GitHub web UI, or `git push`).
3. Repo **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
4. Wait ~1 min. Your app is live at `https://<your-username>.github.io/rebuild/`.

## Connect the cloud (one time, ~10 min)
Open the live app → **More → Cloud → Setup steps**. It has the exact clicks and a copy-paste SQL snippet. Summary:
1. Create a free Supabase project.
2. Project Settings → API: copy **Project URL** + **anon public** key into the app's Cloud screen, tap **Connect project**.
3. SQL Editor → run the snippet from the app (creates your private `records` table with row-level security).
4. Authentication → URL Configuration: set **Site URL** and add a **Redirect URL** = your GitHub Pages URL above. *(This is what makes the email sign-in link return to the app.)*
5. Back in the app: sign in with your email (magic link). You stay signed in after that.

## Install on iPhone
Open the GitHub Pages URL in **Safari → Share → Add to Home Screen**. Launch from the icon and sign in once.

## Notes
- With cloud connected, your data lives in Supabase — the hosting URL no longer determines whether your history is safe.
- The **Export backup** button (More) is a secondary local backup you can keep anywhere.
- Railway isn't needed: Supabase provides the database, auth, and API. Railway would only come into play if you later want your own custom backend server.
