# Braintechken AI Video Studio — MVP plan

This is a product integration plan for the existing LTX-2 repository. Preserve upstream inference code and licenses.

## Goal
A responsive, mobile-first web UI for text-to-video and image-to-video generation, aimed initially at short marketing videos (including FIAXY brand creatives).

## Architecture
- Frontend: Next.js + TypeScript, deployed on Vercel; Vercel hosts UI/API orchestration only, not model inference.
- GPU worker: separate Linux/CUDA environment running the existing LTX pipelines, with job queue and durable object storage.
- Adapter: API endpoints to submit jobs, inspect progress, fetch outputs, and cancel queued jobs.
- Security: authenticated users, rate limits, signed upload/output URLs, no public GPU execution endpoint.
- Secrets: environment variables; never commit tokens or Hugging Face credentials.
- Licensing: code Apache-2.0; model weights separately licensed (LTX-2.x Community License). Review commercial-use conditions before production.

## MVP acceptance criteria
1. Responsive creation page with prompt, aspect ratio, duration preset and optional reference image.
2. Optional logo upload, composited *after* generation to preserve branding fidelity.
3. Server validates file size/type, prompt length and job parameters.
4. Job state machine: queued / running / completed / failed; useful error messages.
5. Video preview, download, and per-user history.
6. Mock mode for UI development without paid GPU.
7. GPU worker adapter with explicit configuration and a single smoke test.
8. No GPU costs incurred until an operator explicitly configures a provider and credentials.

## Implementation phases
- Phase A: isolate web app under `apps/studio` and mock job API.
- Phase B: add storage/auth/job persistence and tests.
- Phase C: deploy GPU inference worker using the upstream distilled pipeline; document memory and cost measurements.
- Phase D: end-to-end video job and branding overlay; harden operational controls.

## Constraints and risks
- Upstream quick start lists ~66 GiB model downloads for LTX-2.5 and a substantial CUDA GPU requirement. GitHub and Vercel alone cannot generate video.
- No claim of free unlimited inference; assess GPU credits and costs before provisioning.
- Avoid adding generated media, model weights, or private credentials to git.
- Keep upstream source updates mergeable; isolate product code rather than editing inference internals.
