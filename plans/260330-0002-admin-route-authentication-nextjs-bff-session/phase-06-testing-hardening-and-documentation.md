# Phase 06 - Testing, Hardening, and Documentation

## Context Links

- Plan overview: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/plan.md`
- Code standards: `docs/code-standards.md`
- System architecture: `docs/system-architecture.md`
- Deployment guide: `docs/deployment-guide.md`

## Overview

- Priority: P1
- Status: Pending
- Goal: prove auth protection works, close documented auth clarity gap, and prepare release checklist.

## Key Insights

- Auth guard clarity is a known gap in docs.
- Security behavior must be validated by route and server-action scenarios.

## Requirements

- Functional: tests for middleware route protection and server action guard behavior.
- Functional: manual verification for direct URL, expiry, non-admin role, logout/back button.
- Non-functional: docs updated to describe architecture and operational constraints.

## Architecture

- Unit test claim/session helpers.
- Integration test middleware and protected admin flows.
- Update docs for auth model, threat boundaries, and environment setup.

## Related Code Files

- Create/Modify: test files for middleware and auth utilities (project test structure)
- Modify: `docs/code-standards.md`
- Modify: `docs/system-architecture.md`
- Modify: `docs/project-roadmap.md`
- Modify: `README.md` (if env/auth run instructions change)

## Implementation Steps

1. Add unit tests for role and expiry validation helpers.
2. Add integration tests for middleware redirect logic.
3. Add server action tests for unauthorized invocation handling.
4. Run build/lint/test and fix auth regressions.
5. Update documentation for final auth model and constraints.
6. Create rollout checklist and rollback notes.

## Todo List

- [ ] Add auth utility tests.
- [ ] Add middleware and action guard integration tests.
- [ ] Update docs and roadmap status.
- [ ] Complete release validation checklist.

## Success Criteria

- All auth protection tests pass.
- Manual matrix passes all defined scenarios.
- Auth model documented and aligned with implemented behavior.

## Risk Assessment

- Risk: false confidence from limited test coverage.
- Mitigation: include negative tests and direct action invocation tests.

## Security Considerations

- Validate secure-cookie flags in production builds.
- Verify no credential/token leakage in logs and client responses.

## Next Steps

- After completion, run code review and release sign-off.
