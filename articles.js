/**
 * Help Articles Data
 * tenant_id: "shared"   → visible to ALL tenants
 * tenant_id: "acme"     → only visible to tenant "acme"
 * tenant_id: "globex"   → only visible to tenant "globex"
 */

export const articles = [
  // ─── SHARED ARTICLES (visible to everyone) ───────────────────────────
  {
    id: "shared-001",
    tenant_id: "shared",
    title: "How to reset your password",
    tags: ["password", "reset", "login", "account"],
    content: `To reset your password:
1. Go to the login page and click "Forgot Password".
2. Enter your registered email address.
3. Check your inbox for a reset link (valid for 30 minutes).
4. Click the link and enter your new password.
5. Your new password must be at least 8 characters with one uppercase letter and one number.

If you don't receive the email, check your spam folder or contact support.`,
  },
  {
    id: "shared-002",
    tenant_id: "shared",
    title: "How to invite team members",
    tags: ["team", "invite", "members", "users", "collaboration"],
    content: `To invite team members to your workspace:
1. Navigate to Settings → Team Members.
2. Click the "Invite Member" button.
3. Enter the email address of the person you want to invite.
4. Select their role: Admin, Editor, or Viewer.
5. Click Send Invite.

The invitee will receive an email with a link to join. Invites expire after 7 days.`,
  },
  {
    id: "shared-003",
    tenant_id: "shared",
    title: "Understanding your billing cycle",
    tags: ["billing", "invoice", "payment", "subscription", "plan"],
    content: `Your billing cycle starts on the date you first subscribed.

- Invoices are generated at the start of each cycle.
- Payment is charged automatically to your saved card.
- You can view all invoices under Settings → Billing.
- To update your payment method, go to Settings → Billing → Payment Methods.

If a payment fails, you'll receive an email and have a 3-day grace period to update your card.`,
  },
  {
    id: "shared-004",
    tenant_id: "shared",
    title: "How to export your data",
    tags: ["export", "data", "download", "csv", "backup"],
    content: `You can export your data at any time:
1. Go to Settings → Data Management.
2. Click "Export Data".
3. Choose your export format: CSV, JSON, or Excel.
4. Select the date range (optional).
5. Click Generate Export — you'll receive a download link by email within minutes.

Exports include all your records, team activity, and configuration settings.`,
  },

  // ─── ACME CORP TENANT ARTICLES ────────────────────────────────────────
  {
    id: "acme-001",
    tenant_id: "acme",
    title: "Acme onboarding: connecting your CRM",
    tags: ["onboarding", "crm", "integration", "salesforce", "acme"],
    content: `Welcome to the platform, Acme team! Here's how to connect your Salesforce CRM:
1. Go to Integrations → CRM → Salesforce.
2. Click "Connect Salesforce" and log in with your Salesforce admin credentials.
3. Authorize the required permissions (read contacts, write activities).
4. Map your Salesforce fields to platform fields using the field mapper.
5. Enable auto-sync (every 15 minutes) or trigger manual syncs.

Your Acme-specific Salesforce instance URL: https://acme.salesforce.com`,
  },
  {
    id: "acme-002",
    tenant_id: "acme",
    title: "Acme custom approval workflow",
    tags: ["approval", "workflow", "acme", "process", "custom"],
    content: `Acme Corp has a custom 3-step approval workflow configured:

Step 1 — Team Lead Review (within 24 hrs)
Step 2 — Finance Sign-off (within 48 hrs)  
Step 3 — Final Director Approval (within 72 hrs)

To submit for approval:
1. Open the record and click "Submit for Approval".
2. Add a note explaining the request.
3. Track status in the Approvals dashboard.

Escalation contacts: approvals@acme.com`,
  },

  // ─── GLOBEX TENANT ARTICLES ───────────────────────────────────────────
  {
    id: "globex-001",
    tenant_id: "globex",
    title: "Globex SSO setup with Okta",
    tags: ["sso", "okta", "login", "authentication", "globex", "single sign-on"],
    content: `Globex uses Okta for Single Sign-On. To configure SSO for new users:
1. Log into your Okta admin dashboard.
2. Navigate to Applications → Add Application → Search for our platform.
3. Use these SAML settings:
   - Entity ID: https://platform.globex.io/saml
   - ACS URL: https://platform.globex.io/saml/callback
4. Assign the app to users or groups in Okta.
5. Users can now log in at platform.globex.io using their Okta credentials.

Contact Globex IT at it-support@globex.io for Okta admin access.`,
  },
  {
    id: "globex-002",
    tenant_id: "globex",
    title: "Globex data retention policy",
    tags: ["data", "retention", "policy", "compliance", "globex", "gdpr"],
    content: `Globex has configured the following data retention settings per compliance requirements:

- User activity logs: retained for 12 months
- Deleted records: permanently purged after 30 days
- Export archives: stored for 6 months then auto-deleted
- Audit logs: retained for 7 years (regulatory requirement)

These settings are managed by Globex's compliance team. To request a data deletion for a specific user, contact dpo@globex.io with the user ID and reason.`,
  },
];
