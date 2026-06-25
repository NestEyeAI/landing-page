# NESTEYE DATA PROCESSING ADDENDUM

This **Data Processing Addendum** (this "DPA") is incorporated into and forms part of the Nesteye Master Services Agreement (the "Agreement") between **Nesteye, Inc.** ("Nesteye") and **[CUSTOMER_NAME]** ("Customer"), and is effective as of the Effective Date of the Agreement.

If there is a conflict between this DPA and the Agreement on the subject of personal information, this DPA prevails. Capitalized terms not defined here have the meanings given in the Agreement.

## 1. Definitions

- **"Applicable Data Protection Law"** means all data protection and privacy laws applicable to a Party's processing of Personal Information, including, without limitation, the California Consumer Privacy Act / California Privacy Rights Act ("CCPA/CPRA"), the Texas Data Privacy and Security Act ("TDPSA"), and similar state laws in Colorado, Connecticut, Utah, and Virginia.
- **"Personal Information"** means information about an identified or identifiable natural person processed under the Agreement, including Customer's authorized users (name, email, phone number) and any individuals incidentally captured by the Edge Kit at a Site.
- **"Process,"** **"Processing,"** **"Controller,"** **"Service Provider,"** and **"Processor"** have the meanings in Applicable Data Protection Law.
- **"Subprocessor"** means any third party authorized by Nesteye to Process Personal Information.

## 2. Roles

For Personal Information Processed by Nesteye on Customer's behalf in connection with the Services, **Customer is the Controller (or Business)** and **Nesteye is the Processor (or Service Provider)**. Nesteye Processes Personal Information only on Customer's documented instructions, the Agreement, and this DPA.

For Personal Information Nesteye collects about its own customer accounts, billing contacts, and website visitors, **Nesteye is the Controller**, and Nesteye's Privacy Policy at https://nesteye.ai/privacy.html applies.

## 3. Scope and Purpose

Nesteye Processes Personal Information solely to:
- Provide and operate the Services.
- Deliver alerts and analytics to Customer's authorized users.
- Provide support to Customer.
- Comply with Customer's documented instructions.
- Comply with legal obligations.
- Improve the Services consistent with Section 5 of the Agreement and Section 5 of this DPA.

The categories of Personal Information, categories of data subjects, and processing duration are described in **Annex A**.

## 4. Nesteye's Obligations

Nesteye will:
- Process Personal Information only as described in Section 3 and on Customer's documented instructions.
- Comply with Applicable Data Protection Law applicable to its role as Processor or Service Provider.
- Ensure that personnel authorized to Process Personal Information are subject to written confidentiality obligations.
- Implement and maintain appropriate technical and organizational measures, including those in **Annex B**, to protect Personal Information against unauthorized or unlawful Processing, accidental loss, destruction, damage, alteration, or disclosure.
- Not "sell" or "share" Personal Information as those terms are defined under the CCPA/CPRA.
- Not retain, use, or disclose Personal Information outside the direct business relationship with Customer or for any purpose other than the specific business purposes set out in this DPA, except as required by law.
- Notify Customer promptly if, in Nesteye's opinion, an instruction violates Applicable Data Protection Law.

## 5. Use of Farm Data for Model Improvement

Customer authorizes Nesteye to use Farm Data, including any incidentally captured Personal Information, to train, validate, and improve Nesteye's machine learning models and to develop new features, **provided that** Nesteye will:
- Use commercially reasonable efforts to de-identify or aggregate Farm Data before use for model improvement.
- Not attempt to re-identify any individual from de-identified Farm Data.
- Apply contractual and technical controls to ensure de-identified data is not combined with other data in a way that re-identifies individuals.

Customer may, in writing, instruct Nesteye to exclude specific Farm Data or specific Sites from model improvement use.

## 6. Subprocessors

### 6.1 Authorization
Customer authorizes Nesteye to engage Subprocessors. A current list of Subprocessors is in **Annex C** and is updated from time to time at **[URL — e.g., nesteye.ai/subprocessors]**.

### 6.2 Notice and Objection
Nesteye will provide at least **[NOTICE — recommend 30] days'** prior written notice of any new or replacement Subprocessor. Customer may object on reasonable grounds within fifteen (15) days. If the Parties cannot resolve the objection in good faith, Customer may terminate the affected Services for material breach and receive a refund of prepaid, unused fees for the affected Services.

### 6.3 Flow-Down
Nesteye will impose obligations on each Subprocessor that are no less protective than those in this DPA.

## 7. Data Subject Rights

Nesteye will, taking into account the nature of the Processing, provide reasonable assistance through appropriate technical and organizational measures to enable Customer to respond to requests from data subjects exercising their rights under Applicable Data Protection Law (access, correction, deletion, portability, opt-out of sale/share, and similar). If Nesteye receives a data subject request directly, it will, where legally permitted, forward the request to Customer without acting on it.

## 8. Security Incidents

Nesteye will notify Customer without undue delay, and in any event within **[NOTICE — recommend 72] hours**, of any confirmed Security Incident affecting Personal Information. Notice will include the information reasonably available to Nesteye about the nature and scope of the incident, the Personal Information affected, the steps Nesteye has taken or proposes to take to mitigate it, and a point of contact for inquiries. "Security Incident" means a breach of Nesteye's security leading to the accidental or unlawful destruction, loss, alteration, or unauthorized disclosure of or access to Personal Information.

Nesteye's notification or response to a Security Incident is not an acknowledgment of fault or liability.

## 9. Audits

On reasonable prior written request, no more than once per twelve-month period (or more frequently if required by law or following a Security Incident), Nesteye will make available to Customer information reasonably necessary to demonstrate compliance with this DPA, including independent audit reports (e.g., SOC 2 Type II) when available. On-site audits by Customer or its third-party auditor are permitted only on **[NOTICE — recommend 60] days'** prior notice, during business hours, subject to Nesteye's confidentiality and security policies, and at Customer's expense.

## 10. International Transfers

Personal Information is Processed in the United States. If Customer is located outside the United States and Applicable Data Protection Law requires a transfer mechanism, the Parties will enter into Standard Contractual Clauses or another lawful mechanism. **[NEGOTIATE: include EU SCCs and UK addendum if and when Nesteye markets to those geographies.]**

## 11. Return or Deletion

On termination or expiration of the Agreement, Nesteye will, at Customer's choice, return or delete Personal Information in Nesteye's possession or control within **[DELETION_PERIOD — recommend 90] days**, except (a) as required by law, (b) one archival copy retained in secure, isolated storage, and (c) de-identified or aggregated data that no longer identifies any individual.

## 12. Liability

The liability provisions of the Agreement apply to this DPA. The Parties acknowledge that fines and penalties imposed by a regulator are not "indirect" or "consequential" damages for purposes of the Agreement.

---

**ANNEX A — DETAILS OF PROCESSING**

- **Categories of data subjects:** Customer's authorized users (farm operators, farm staff), Customer's employees who interact with the Services, and any individuals incidentally captured by the Edge Kit (e.g., farm workers entering the barn).
- **Categories of Personal Information:** Name, email address, phone number, role, login credentials, dashboard activity, support communications, IP address, and incidental imagery of individuals captured during inference.
- **Special categories:** None intentionally Processed. Incidental imagery is deleted from the edge device after inference and is not transmitted off-site by default.
- **Frequency of Processing:** Continuous during the Subscription Term.
- **Nature and purpose:** Operation of the Services, delivery of alerts and analytics, model improvement (subject to Section 5), customer support.
- **Duration:** For the duration of the Agreement and as set out in Section 11 of this DPA.

**ANNEX B — TECHNICAL AND ORGANIZATIONAL MEASURES**

- Encryption of Personal Information in transit using TLS 1.2 or above.
- Encryption at rest in Nesteye's cloud infrastructure.
- Edge-first architecture: real-time video remains on the Edge Kit and is not transmitted to the cloud by default.
- Role-based access control with least-privilege principles.
- Multi-factor authentication for administrative access to Nesteye production systems.
- Audit logging of access to Personal Information.
- Vendor security review for Subprocessors.
- Incident response procedures with documented runbooks.
- Periodic security training for personnel.
- Background checks for personnel with access to production systems where permitted by law.
- Annual review of these measures.

**ANNEX C — SUBPROCESSORS (initial list)**

| Subprocessor | Service | Location |
|------|------|------|
| Amazon Web Services, Inc. | Cloud hosting, storage of Derived Data and operational telemetry | United States |
| **[EMAIL_VENDOR]** | Transactional email delivery (alerts, account notices) | **[REGION]** |
| **[SMS_VENDOR]** | SMS alert delivery | **[REGION]** |
| **[SUPPORT_VENDOR]** | Customer support ticketing | **[REGION]** |
| **[ANALYTICS_VENDOR — if used]** | Product analytics | **[REGION]** |

---

**IN WITNESS WHEREOF**, the Parties have executed this DPA as of the Effective Date of the Agreement.

**NESTEYE, INC.**

By: _____________________________
Name: **[NAME]**
Title: **[TITLE]**

**[CUSTOMER_NAME]**

By: _____________________________
Name: **[NAME]**
Title: **[TITLE]**
