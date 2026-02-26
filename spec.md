# Specification

## Summary
**Goal:** Remove the Teacher role from the application and display the actual Paytm UPI QR code on the Donation page.

**Planned changes:**
- Remove the Teacher option from the RoleSelectionModal so only Parent and Admin roles are available
- Remove all teacher-specific navigation links, route guards, and role checks from Header, Footer, Home, and App components
- Remove or redirect the /teacher-dashboard route
- Replace the UPI QR code placeholder on the Donation page with the actual Paytm QR code image (from the uploaded photo)
- Display the UPI ID "kamerarajendra098@ptyes" below the QR code
- Add a label "Scan with any UPI app (Paytm, PhonePe, BHIM, Google Pay)" beneath the QR code

**User-visible outcome:** Users no longer see a Teacher login option. The Donation page shows the real scannable Paytm UPI QR code with the UPI ID and instructions, so donors can complete payments directly.
