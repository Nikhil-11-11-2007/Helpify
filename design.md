
# **Design System & Frontend Spec**

## Multi-Tenant AI Customer Support Platform

---

## 1. Core Design Philosophy

This product should not feel like a “chat app clone” or a “SaaS template.”
The design intent is:

* **Calm, clinical, and trustworthy** 
* **Soft but structured** (no harsh contrasts, no loud gradients)
* **Precision over decoration** (every animation and element must have purpose)
* **Human + AI coexistence** visually represented (not just functional)

Think of the UI as:

> A quiet operations room where conversations, problems, and resolutions flow smoothly.

---

## 2. Visual Identity

### 2.1 Color System (Soft Clinical Palette)

Avoid default Tailwind blues/purples.

**Primary Palette:**

* Base Background: `#F8FAFB` (soft off-white, not pure white)
* Surface: `#FFFFFF`
* Secondary Surface: `#F1F5F7`
* Accent Primary: `#5BA4A4` (muted teal)
* Accent Secondary: `#7C9EFF` (soft blue, used sparingly)
* Success: `#6FCF97`
* Warning: `#F2C94C`
* Error: `#EB5757`

**Text Colors:**

* Primary: `#1F2933`
* Secondary: `#52606D`
* Muted: `#9AA5B1`

**Key Rule:**
No harsh black, no neon gradients, no overly saturated UI.

---

### 2.2 Typography

Use typography to create hierarchy, not color.

* Headings: Inter / Satoshi / General Sans
* Body: Inter
* Monospace (for logs/system): JetBrains Mono

**Scale:**

* H1: 28–32px (Dashboard titles)
* H2: 22–24px
* H3: 18px
* Body: 14–16px
* Micro text: 12px

**Style:**

* Slightly increased letter spacing on headings
* Medium weight instead of bold wherever possible

---

### 2.3 Spacing System

Use a **consistent 8px grid system**

* XS: 4px
* SM: 8px
* MD: 16px
* LG: 24px
* XL: 32px
* XXL: 48px

Whitespace is critical. Avoid cramped layouts.

---

## 3. Layout Architecture

### 3.1 Global Layout Structure

```
| Sidebar | Main Content |
```

Inside main:

```
| Header |
| Content Area |
```

---

### 3.2 Sidebar (Multi-Tenant Core)

Purpose:

* Organization switching
* Navigation
* Identity anchor

**Sections:**

1. Workspace Switcher (Top)
2. Navigation
3. AI Status Indicator
4. User Profile (Bottom)

**Design Notes:**

* Slight glassmorphism (very subtle blur)
* Soft highlight on hover (no harsh hover colors)
* Active state = left border + background tint

---

### 3.3 Main Content Zones

Each page must follow:

```
Header (Sticky)
↓
Primary Workspace
↓
Context Panel (Optional Right Sidebar)
```

---

## 4. Key Screens & Components

---

## 4.1 Chat Interface (Core Feature)

### Structure:

```
| Conversations List | Chat Window | AI Context Panel |
```

---

### 4.1.1 Conversations List

* Compact but readable
* Includes:

  * Customer name
  * Last message preview
  * Status badge (AI / Human / Escalated)
  * Timestamp

**Interaction:**

* Hover → subtle background shift
* Active → soft highlight + left accent line

---

### 4.1.2 Chat Window

This is the emotional core of the product.

#### Message Design

**Human Messages:**

* Right aligned
* Soft blue background

**Customer Messages:**

* Left aligned
* Neutral gray background

**AI Messages:**

* Slight tint (teal hint)
* Label: “AI Suggested” or “Auto-response”

---

#### Micro Interaction:

* Messages fade + slide in (GSAP)
* Typing indicator uses **pulse + wave motion**
* AI generating response → animated shimmer

---

### 4.1.3 AI Suggestions Layer

Below input field:

* Suggested replies (chips)
* Editable AI drafts
* “Regenerate” option

**Important:**
AI should feel assistive, not intrusive.

---

## 4.2 Ticket Management System

---

### Layout:

```
| Filters | Ticket List | Ticket Detail |
```

---

### Ticket Card

* Title
* Customer
* Priority badge
* Status
* Assigned agent

**Visual Hierarchy:**
Use spacing and typography, not borders.

---

### Ticket Detail View

Sections:

* Conversation history
* Internal notes (different color tone)
* Activity timeline

---

## 4.3 Dashboard (Multi-Tenant Overview)

---

### Components:

1. Metrics Cards

   * Open tickets
   * AI resolved %
   * Avg response time

2. Graphs

   * Smooth animated charts (no flashy colors)

3. Activity Feed

---

### Animation:

* Cards → subtle upward fade
* Graph lines → draw animation

---

## 5. Motion & Interaction Design

---

### 5.1 Motion Philosophy

Animation must:

* Indicate state change
* Guide attention
* Reduce cognitive load

NOT:

* Decorative
* Distracting

---

### 5.2 GSAP Usage

Use GSAP for:

* Page transitions (fade + slight translate)
* Message entry animation
* Sidebar expand/collapse
* Modal transitions

---

### 5.3 Micro Interactions

* Button hover → slight lift (translateY -2px)
* Click → compression effect
* Input focus → glow ring (soft teal)

---

## 6. AI Layer UX Representation

---

### 6.1 AI Visibility

AI should always be:

* Visible
* Transparent
* Controllable

---

### 6.2 AI Indicators

Use:

* Small icon + label
* “AI Active” badge
* Confidence indicators (optional)

---

### 6.3 AI States

1. Idle
2. Generating
3. Suggesting
4. Escalating to human

Each state should have:

* Visual distinction
* Motion feedback

---

## 7. Role-Based UI Variations

---

### Admin View

* Full dashboard
* Analytics
* Team management

---

### Agent View

* Chat-first UI
* Minimal analytics

---

### AI Supervisor Mode (Optional Advanced)

* Override AI decisions
* Adjust thresholds

---

## 8. Multi-Tenant UX Patterns

---

### Workspace Switching

* Dropdown at top
* Animated transition between tenants
* Preserve context where possible

---

### Data Isolation

Visually reinforce:

* Tenant name always visible
* Color tint variation per tenant (subtle)

---

## 9. Avoiding “AI Slop” Design

---

### DO NOT:

* Use generic gradients
* Overuse glassmorphism
* Copy Intercom/Slack blindly
* Use default Tailwind styles without modification

---

### DO:

* Customize spacing aggressively
* Use restrained color palette
* Focus on typography hierarchy
* Add purposeful motion

---

## 10. State Management (Zustand Integration)

---

### Store Design

Split stores:

* authStore
* chatStore
* ticketStore
* uiStore
* aiStore

---

### Example Responsibilities

**chatStore:**

* conversations
* activeChat
* messages

**aiStore:**

* suggestions
* loading state
* confidence scores

---

### Key Principle:

Avoid global re-renders. Keep stores modular.

---

## 11. Component Design Rules

---

### Every Component Must:

* Have clear purpose
* Be reusable
* Support loading + error states

---

### Example Components

* ChatBubble
* TicketCard
* AIIndicator
* SuggestionChip
* SidebarItem

---

## 12. Performance & Perception

---

### Techniques:

* Skeleton loaders instead of spinners
* Lazy load conversations
* Virtualized lists for chats

---

### Perceived Speed > Actual Speed

---

## 13. Final Experience Goal

The product should feel like:

* A calm system managing chaos
* AI working quietly in the background
* Humans always in control

---

## 14. Build Instructions for OpenCode

---

When generating UI:

1. Do NOT use default component libraries blindly
2. Apply custom spacing and color tokens
3. Use GSAP for motion (not CSS-only for major transitions)
4. Ensure role-based rendering
5. Maintain strict visual hierarchy
6. Avoid visual clutter at all costs
