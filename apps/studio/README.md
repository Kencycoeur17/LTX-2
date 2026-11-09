# Braintechken AI Video Studio (UI prototype)

A mobile-first Next.js prototype inside the LTX-2 fork. **This does not generate videos.** The creation button saves a local browser draft, not a GPU job.

## Run locally

Requires Node.js 20+ and npm.

```bash
cd apps/studio
npm install
npm run dev
```

Open http://localhost:3000.

## Vercel

Set the project Root Directory to `apps/studio`. Deploying this UI does **not** deploy LTX-2.5 inference. Avoid attaching billing-enabled GPU infrastructure until explicit cost approval.

## Current features

- French responsive creation UI, text/image mode, prompt and format presets
- Client-side reference image and logo selection (not uploaded)
- Local browser draft history, with reuse
- Explicit demo state and no fabricated generated-video previews

## Important limitations

- Browser drafts are localStorage-only, not synced across devices.
- Uploaded images and logos are **not persisted** in drafts.
- Preset durations are UI targets, not validated against actual model constraints.
- No auth, API, backend queue, model weights, or GPU execution yet.

## Next milestones

Add validated API contracts, authentication, durable uploads, GPU queue adapter, actual inference, and post-processing logo compositing. Keep upstream inference packages unmodified.
