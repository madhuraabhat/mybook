<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0 (security & privacy enhancement)
Modified principles: V. E-commerce Best Practices (enhanced with security details)
Added sections: VI. Security & Privacy (NON-NEGOTIABLE)
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligns with TDD and component principles
  ✅ spec-template.md - User scenarios align with e-commerce requirements
  ✅ tasks-template.md - Test-first tasks align with TDD principle
Follow-up TODOs: None
-->

# MyBook Constitution

## Core Principles

### I. Test-Driven Development (NON-NEGOTIABLE)

TDD is mandatory for all feature development. The Red-Green-Refactor cycle MUST be strictly enforced: Write tests first → Get user/stakeholder approval → Verify tests fail → Implement feature → Verify tests pass → Refactor. All new features, components, and business logic MUST have corresponding tests written before implementation. Tests serve as both specification and validation. Rationale: Ensures code quality, prevents regressions, and provides living documentation of system behavior.

### II. Component-Based Architecture

All UI elements MUST be built as reusable, self-contained React components. Components MUST be independently testable, have clear prop interfaces, and follow single responsibility principle. Shared components MUST live in a dedicated components library structure. Components MUST be documented with their purpose, props, and usage examples. Rationale: Enables maintainability, reusability, and consistent UI patterns across the application.

### III. Modern Boutique Design

The application MUST maintain a boutique, curated aesthetic with modern layout principles. Design decisions MUST prioritize user experience, visual hierarchy, and brand consistency. All UI components MUST be responsive and accessible. Design system tokens (colors, typography, spacing) MUST be centralized and consistently applied. Rationale: Creates a distinctive, premium experience that reflects the niche book curation brand and builds user trust.

### IV. Performance & Accessibility

All pages and components MUST meet performance benchmarks: Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1). Images MUST be optimized using Next.js Image component. Code splitting MUST be implemented at route and component levels. Accessibility MUST meet WCAG 2.1 AA standards minimum. All interactive elements MUST be keyboard navigable and screen reader compatible. Rationale: Performance directly impacts user experience and conversion rates; accessibility ensures inclusive access to all users.

### V. E-commerce Best Practices

All e-commerce flows (browse, search, cart, checkout, payment) MUST follow industry security and UX standards. Payment processing MUST use secure, PCI-compliant methods. User data and transactions MUST be protected with appropriate encryption and privacy measures. Shopping cart state MUST persist across sessions. Product catalog MUST support filtering, sorting, and search functionality. Rationale: Ensures secure, trustworthy transactions and provides users with expected e-commerce functionality.

### VI. Security & Privacy (NON-NEGOTIABLE)

All user inputs MUST be validated and sanitized to prevent injection attacks (XSS, code injection). All data transmission MUST use HTTPS/TLS encryption. Sensitive data (payment information, personal details) MUST never be logged, exposed in error messages, or stored in client-side storage without encryption. Content Security Policy (CSP) headers MUST be configured to prevent XSS attacks. All forms MUST implement CSRF protection when server-side processing is added. Dependencies MUST be regularly audited for known vulnerabilities. Error messages MUST not leak sensitive information (stack traces, database details, internal paths). Authentication and authorization MUST be implemented before any user-specific data access. Rate limiting MUST be implemented for all user-facing endpoints to prevent abuse. Privacy: User data collection MUST be minimal, transparent, and comply with applicable privacy regulations (GDPR, CCPA). Rationale: Security vulnerabilities can lead to data breaches, financial loss, and loss of user trust. Privacy violations can result in legal penalties and reputational damage.

## Technology Stack

**Framework**: Next.js (App Router) with React  
**Language**: TypeScript (strict mode)  
**Styling**: CSS Modules or Tailwind CSS (design system dependent)  
**Testing**: Jest + React Testing Library for unit/component tests; Playwright or Cypress for E2E tests  
**State Management**: React Context API or Zustand (prefer lightweight solutions)  
**Data Fetching**: Next.js Server Components and Server Actions (prefer server-side rendering)  
**Deployment**: Vercel or compatible Next.js hosting platform

## Development Workflow

**TDD Process**: 
1. Write failing test(s) for feature/component
2. Get stakeholder approval on test scenarios
3. Verify tests fail (Red)
4. Implement minimal code to pass tests (Green)
5. Refactor while keeping tests green
6. Commit with descriptive message

**Code Review**: All PRs MUST verify constitution compliance, especially TDD adherence and component test coverage. Reviewers MUST check that tests were written before implementation.

**Quality Gates**: 
- All tests MUST pass before merge
- No new code without corresponding tests (except infrastructure/config)
- TypeScript strict mode compliance required
- Linting and formatting checks must pass

## Governance

This constitution supersedes all other development practices and guidelines. Amendments require:
1. Documentation of the proposed change and rationale
2. Review and approval process
3. Update to this document with version increment
4. Propagation to dependent templates and documentation

All PRs and code reviews MUST verify compliance with these principles. Any deviation from principles MUST be explicitly justified in the Complexity Tracking section of implementation plans. Complexity must be justified with clear reasoning for why simpler alternatives were insufficient.

**Version**: 1.1.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
