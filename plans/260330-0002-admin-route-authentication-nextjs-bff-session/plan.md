---
title: "Admin Route Authentication with Next.js BFF Session"
description: "Implement server-first admin authentication using secure cookie sessions, middleware guards, and server action authorization checks."
status: pending
priority: P1
effort: 22h
branch: main
tags: [feature, frontend, auth, api, critical]
created: 2026-03-30
---

# Admin Route Authentication Plan

## Overview

Implement Next.js App Router auth for all `/admin/*` routes except `/admin/login`.
Use BFF auth handlers and httpOnly cookie session.
Enforce role claim `roleKey` contains `admin_operations`.
No refresh flow in this phase. Expired token redirects to login.

## Inputs

- Brainstorm summary: `plans/260329-2356-admin-authentication-mechanism-brainstorm-summary/brainstorm-summary.md`
- JWT constraints: TTL 4h, clock skew tolerance 5m
- Backend contract: login returns tokens in JSON body

## Phases

| #   | Phase                                 | Status  | Effort | Link                                                              |
| --- | ------------------------------------- | ------- | ------ | ----------------------------------------------------------------- |
| 1   | Auth Contract and Session Utilities   | Pending | 4h     | [phase-01](./phase-01-auth-contract-and-session-utilities.md)     |
| 2   | BFF Auth Route Handlers               | Pending | 4h     | [phase-02](./phase-02-nextjs-bff-auth-route-handlers.md)          |
| 3   | Middleware Guard and Admin Login Gate | Pending | 4h     | [phase-03](./phase-03-middleware-guard-and-admin-login-gate.md)   |
| 4   | Server Action Authorization Guard     | Pending | 4h     | [phase-04](./phase-04-admin-server-action-authorization-guard.md) |
| 5   | Admin UI Integration and Logout Flow  | Pending | 3h     | [phase-05](./phase-05-admin-ui-integration-and-logout-flow.md)    |
| 6   | Testing, Hardening, and Documentation | Pending | 3h     | [phase-06](./phase-06-testing-hardening-and-documentation.md)     |

## Dependencies

- Backend auth endpoints reachable from frontend runtime.
- JWT payload includes `exp` and `roleKey` array.
- Secure cookie behavior configured for local and production.

## Execution Notes

- Keep changes DRY by centralizing auth/session helpers.
- Prefer server-side checks; client checks only for UX hints.
- Do not store access tokens in localStorage/sessionStorage.
- If scope grows (refresh/revocation), create follow-up plan.
