# Test Plan: SauceDemo Basic Functionality

**Target:** https://www.saucedemo.com/
**Seed:** tests/seed.spec.ts
**Date:** 2026-08-24

## Overview
This plan covers the primary SauceDemo shopping journey from authentication through product browsing, cart management, checkout, and logout. It also covers the main validation and error paths that protect those workflows.

## Preconditions
- Use the SauceDemo environment at `https://www.saucedemo.com/`.
- Use only the documented demo credentials; do not use real personal or payment data.
- For successful shopping scenarios, use `standard_user` and password `secret_sauce`.
- Start each scenario in a fresh browser context or reset the application state before starting.
- Complete checkout scenarios with safe demo values such as first name `Test`, last name `User`, and postal code `00000`.

## Scenarios

### Scenario 1.1 — Login with a valid standard user
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** The login page is open and no authenticated state exists.
- **Steps:**
  1. Enter `standard_user` in the Username field and `secret_sauce` in the Password field, then select Login — expected: the inventory page opens.
  2. Observe the inventory page — expected: the Swag Labs header, navigation menu, product list, cart link, and product sort control are visible.
- **Assertions:**
  - The URL is the inventory route and the page contains the Products heading.
  - At least one product has a name, price, image, and Add to cart control.
- **Edge cases considered:** Already-authenticated state; empty username or password; browser refresh after login.

### Scenario 1.2 — Reject invalid login credentials
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** The login page is open.
- **Steps:**
  1. Enter an invalid username and invalid password, then select Login — expected: login remains on the login page.
  2. Inspect the error message — expected: a clear authentication error is displayed and the fields remain available.
- **Assertions:**
  - The inventory page is not opened.
  - The login error message is visible.
- **Edge cases considered:** Empty fields; valid username with an incorrect password; incorrect username with the shared password.

### Scenario 1.3 — Show locked-out user message
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** The login page is open.
- **Steps:**
  1. Log in with `locked_out_user` and `secret_sauce` — expected: login is refused.
  2. Inspect the displayed error — expected: the locked-out status is explained.
- **Assertions:**
  - The user remains on the login page.
  - The error identifies the account as locked out.
- **Edge cases considered:** Retrying after the error; ensuring no partial authenticated session is created.

### Scenario 2.1 — Browse inventory and open a product detail page
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Review the inventory list — expected: products are displayed with names, prices, images, and action buttons.
  2. Select a product name or image — expected: its detail page opens.
  3. Select the Back to products control — expected: the inventory list opens again.
- **Assertions:**
  - The detail page shows the selected product’s matching name, description, price, image, and cart action.
  - Returning to products restores the inventory view.
- **Edge cases considered:** Navigating directly to a product detail route while logged out; browser back navigation.

### Scenario 2.2 — Sort products using each available order
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Logged in as `standard_user` with the inventory page open.
- **Steps:**
  1. Select Name (A to Z) — expected: product names are in ascending alphabetical order.
  2. Select Name (Z to A) — expected: product names are in descending alphabetical order.
  3. Select Price (low to high) — expected: prices are in ascending numeric order.
  4. Select Price (high to low) — expected: prices are in descending numeric order.
- **Assertions:**
  - The visible product order matches the selected sort option after every change.
  - The selected option remains selected after sorting.
- **Edge cases considered:** Price comparison must be numeric rather than lexicographic; sorting after adding an item; refresh behavior.

### Scenario 2.3 — Add and remove products from inventory
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Logged in as `standard_user` with an empty cart.
- **Steps:**
  1. Select Add to cart for one product — expected: the button changes to Remove and the cart badge shows `1`.
  2. Add a second product — expected: the cart badge increments to `2`.
  3. Select Remove for the first product — expected: its button returns to Add to cart and the badge decrements to `1`.
- **Assertions:**
  - The cart badge count equals the number of currently selected products.
  - Each product’s action button reflects its current cart state.
- **Edge cases considered:** Adding the same product twice; removing the only item; cart badge visibility when empty.

### Scenario 3.1 — View cart contents and adjust quantities
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Logged in as `standard_user`; at least two products have been added.
- **Steps:**
  1. Open the cart — expected: each selected product appears with name, description, price, quantity, and Remove control.
  2. Select Continue Shopping — expected: the inventory page opens and the cart contents remain.
  3. Reopen the cart and remove one product — expected: only the remaining product is listed and the badge updates.
- **Assertions:**
  - Cart items match the products added from inventory.
  - Removing an item updates both the item list and cart badge.
- **Edge cases considered:** Empty cart; direct checkout navigation with no items; preserving contents while navigating back to products.

### Scenario 3.2 — Validate checkout information fields
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Logged in as `standard_user`; the cart contains at least one product.
- **Steps:**
  1. Open the cart and select Checkout — expected: the checkout information page opens.
  2. Submit the form with one or more required fields empty — expected: submission is blocked and a field-specific error appears.
  3. Enter valid first name, last name, and postal code, then select Continue — expected: the checkout overview page opens.
- **Assertions:**
  - Missing required data produces a visible validation message and does not advance the flow.
  - Valid data advances to the overview page.
- **Edge cases considered:** Each required field missing individually; whitespace-only values; alphanumeric and zero postal codes.

### Scenario 3.3 — Review totals and complete an order
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Logged in as `standard_user`; valid checkout information has been entered; the cart contains at least one product.
- **Steps:**
  1. Review the checkout overview — expected: selected items, quantities, prices, item subtotal, tax, and total are displayed.
  2. Select Finish — expected: the order confirmation page opens.
  3. Inspect confirmation — expected: a success message and order completion graphic are displayed.
- **Assertions:**
  - The displayed total equals subtotal plus tax.
  - The confirmation page clearly states that the order has been dispatched or completed.
  - Selecting Back Home returns to the inventory page.
- **Edge cases considered:** Single-item and multi-item totals; completing after navigating back; cart reset after order completion.

### Scenario 4.1 — Use navigation menu and log out
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Open the navigation menu — expected: All Items, About, Logout, and Reset App State options are visible.
  2. Select Logout — expected: the login page opens.
  3. Navigate to the inventory route directly — expected: unauthenticated access returns to login.
- **Assertions:**
  - Logout removes access to the authenticated inventory page.
  - The login form is visible after logout and direct protected-route access.
- **Edge cases considered:** Logout with items in the cart; browser back after logout; repeated logout attempts.

### Scenario 4.2 — Reset application state
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Logged in as `standard_user`; one or more products are in the cart.
- **Steps:**
  1. Open the navigation menu and select Reset App State — expected: cart state is cleared.
  2. Inspect inventory and cart — expected: product buttons show Add to cart and the cart badge is absent or zero.
- **Assertions:**
  - Previously selected products are no longer in the cart.
  - Resetting state does not log the user out.
- **Edge cases considered:** Reset from inventory; reset after visiting cart; reset after a completed order.

### Scenario 5.1 — Verify responsive layout at supported viewport sizes
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Open the inventory, cart, and checkout pages at desktop and mobile viewport sizes — expected: each page remains usable.
  2. Open and close the navigation menu on mobile — expected: menu controls remain reachable without horizontal clipping.
- **Assertions:**
  - No primary control, product information, cart content, or checkout field is visually clipped or overlapping.
  - The cart and menu remain accessible at both viewport sizes.
- **Edge cases considered:** Narrow mobile width; long validation errors; orientation or viewport resize during checkout.

## Not covered (and why)
- Sauce Labs marketing site pages outside SauceDemo are not covered because this plan targets the shopping application at `saucedemo.com`.
- Performance, accessibility compliance, visual regression, and cross-browser matrices require dedicated non-functional plans.
- The `problem_user`, `performance_glitch_user`, `error_user`, and `visual_user` accounts are not detailed as separate scenarios; they should be covered in a dedicated account-behavior and resilience plan.
- Real payment processing is not covered because SauceDemo uses a simulated checkout and no real payment data should be entered.