import { test, expect } from '@playwright/test';

test.describe('Nivara Infrastructure - Public Website & Admin CMS E2E Tests', () => {

  test('1. Homepage loads brand identity, hero, capabilities, and navigation', async ({ page }) => {
    await page.goto('/');

    // Check title and brand wordmark
    await expect(page).toHaveTitle(/Nivara Infrastructure/);
    await expect(page.locator('header')).toContainText('Nivara');
    await expect(page.locator('header')).toContainText('Infrastructure');

    // Check hero headline
    const heroHeadline = page.locator('h1');
    await expect(heroHeadline).toContainText('Engineering Infrastructure');
    await expect(heroHeadline).toContainText('Building Tomorrow');

    // Check primary CTAs
    const exploreBtn = page.getByRole('link', { name: 'Explore Our Projects' });
    await expect(exploreBtn).toBeVisible();

    const discussBtn = page.getByRole('link', { name: 'Discuss a Project' }).first();
    await expect(discussBtn).toBeVisible();

    // Check capabilities section
    await expect(page.locator('text=Highways & Bridges').first()).toBeVisible();
    await expect(page.locator('text=Urban & Transit').first()).toBeVisible();
    await expect(page.locator('text=Water & Utilities').first()).toBeVisible();

    // Check footer
    await expect(page.locator('footer')).toContainText('Nivara Infrastructure');
    await expect(page.locator('footer')).toContainText('Privacy Policy');
    await expect(page.locator('footer')).toContainText('Terms of Engagement');
  });

  test('2. Projects directory supports category filtering and navigation', async ({ page }) => {
    await page.goto('/projects');

    // Check page header
    await expect(page.locator('h1')).toContainText('Project Directory');

    // Verify search input is present
    const searchInput = page.locator('input[name="search"]');
    await expect(searchInput).toBeVisible();

    // Verify category filter tabs
    await expect(page.getByRole('link', { name: 'Highways & Bridges' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Urban & Transit' }).first()).toBeVisible();

    // Check project cards are rendered
    const projectCards = page.locator('article');
    const cardCount = await projectCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('3. Project detail page renders technical specifications and gallery', async ({ page }) => {
    await page.goto('/projects/western-coastal-elevated-viaduct');

    // Verify heading
    await expect(page.locator('h1')).toContainText('Western Coastal Elevated Viaduct');

    // Verify category and location metadata
    await expect(page.locator('text=Highways & Bridges').first()).toBeVisible();
    await expect(page.locator('text=Maharashtra').first()).toBeVisible();

    // Verify technical specifications are rendered
    await expect(page.locator('text=Technical Specifications')).toBeVisible();
    await expect(page.locator('text=Total Viaduct Length')).toBeVisible();

    // Verify scope of work is rendered
    await expect(page.locator('text=Scope of Civil Construction')).toBeVisible();

    // Verify gallery or media container exists
    await expect(page.locator('img').first()).toBeVisible();
  });

  test('4. Services and About pages load successfully', async ({ page }) => {
    await page.goto('/services');
    await expect(page.locator('h1')).toContainText('Specialized Civil Infrastructure Delivery');
    await expect(page.locator('text=Highways, Expressways & Interchanges')).toBeVisible();

    await page.goto('/about');
    await expect(page.locator('h1')).toContainText('Built On Discipline');
    await expect(page.locator('text=Core Engineering Values')).toBeVisible();
  });

  test('5. Contact inquiry form validation and submission', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toContainText('Contact Engineering & Projects Desk');

    // Fill form fields
    await page.fill('input[name="name"]', 'Vikramaditya Construction Group');
    await page.fill('input[name="email"]', 'tenders@vikramaditya.com');
    await page.fill('input[name="phone"]', '+91 98200 12345');
    await page.fill('input[name="organization"]', 'Vikramaditya EPC Ltd');
    await page.fill('input[name="projectLocation"]', 'Kutch, Gujarat');
    await page.fill('input[name="subject"]', 'Solar Park Substation EPC Tender Consultation');
    await page.fill('textarea[name="message"]', 'We are requesting technical consultation and equipment prequalification for 400kV substation civil works.');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify confirmation message
    await expect(page.locator('text=Inquiry Successfully Transmitted')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Filing Reference ID:')).toBeVisible();
  });

  test('6. Admin portal login, dashboard telemetry, and protected routes', async ({ page }) => {
    // Navigate to admin login
    await page.goto('/admin/login');
    await expect(page.locator('h2')).toContainText('Administrative Control Portal');

    // Attempt login with valid seeded credentials
    await page.fill('input[name="email"]', 'admin@nivarainfra.com');
    await page.fill('input[name="password"]', 'NivaraAdmin2026!');
    await page.click('button[type="submit"]');

    // Verify redirection to dashboard
    await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('CMS Executive Dashboard');

    // Verify telemetry metrics cards exist
    await expect(page.locator('text=Total Projects')).toBeVisible();
    await expect(page.locator('text=Published & Public')).toBeVisible();

    // Navigate to projects management
    await page.goto('/admin/projects');
    await expect(page.locator('h1')).toContainText('Project Database Records');
    await expect(page.locator('table')).toBeVisible();

    // Navigate to inquiries
    await page.goto('/admin/inquiries');
    await expect(page.locator('h1')).toContainText('Inquiries & Tender RFPs');

    // Navigate to settings
    await page.goto('/admin/settings');
    await expect(page.locator('h1')).toContainText('Settings & Governance');
    await expect(page.locator('text=Nivara Superadmin').first()).toBeVisible();
  });
});

