import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { createApp } from '../src/app.js';
import { User } from '../src/models/User.js';
import { Project } from '../src/models/Project.js';
import { Inquiry } from '../src/models/Inquiry.js';

describe('Nivara Infrastructure API Integration Tests', () => {
  let app;
  let superadminCookie = '';
  let editorCookie = '';
  let testProjectId = '';
  let testProjectSlug = 'test-coastal-causeway';

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDB();
    app = createApp();

    // Clean up test collections
    await Promise.all([
      User.deleteMany({ email: { $in: ['test_admin@nivara.com', 'test_editor@nivara.com'] } }),
      Project.deleteMany({ slug: { $in: [testProjectSlug, 'published-test-bridge', 'draft-test-dam'] } }),
      Inquiry.deleteMany({ email: 'tender_test@contractor.com' })
    ]);

    // Create superadmin user
    const superadminHash = await User.hashPassword('SuperAdminPass123!');
    const superadmin = await User.create({
      name: 'Test Superadmin',
      email: 'test_admin@nivara.com',
      passwordHash: superadminHash,
      role: 'superadmin',
      isActive: true
    });

    // Create editor user
    const editorHash = await User.hashPassword('EditorPass123!');
    const editor = await User.create({
      name: 'Test Editor',
      email: 'test_editor@nivara.com',
      passwordHash: editorHash,
      role: 'editor',
      isActive: true
    });

    // Seed one published project and one draft project
    await Project.create([
      {
        title: 'Published Test Bridge',
        slug: 'published-test-bridge',
        category: 'Highways & Bridges',
        location: 'Goa Coastal Link',
        constructionStatus: 'Completed',
        publicationStatus: 'Published',
        archiveStatus: 'Active',
        isFeatured: true,
        shortDescription: 'A published test bridge across backwaters.',
        fullDescription: 'Comprehensive engineering details for published bridge.',
        coverImage: { url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c' },
        createdBy: superadmin._id
      },
      {
        title: 'Draft Test Dam',
        slug: 'draft-test-dam',
        category: 'Water & Utilities',
        location: 'Western Ghats Reservoir',
        constructionStatus: 'Ongoing',
        publicationStatus: 'Draft',
        archiveStatus: 'Active',
        isFeatured: false,
        shortDescription: 'Draft project not ready for public viewing.',
        fullDescription: 'Private confidential technical details.',
        coverImage: { url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413' },
        createdBy: superadmin._id
      }
    ]);
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('1. Health & Public Endpoints', () => {
    it('GET /health returns 200 and healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.database).toBe('connected');
    });

    it('GET /api/v1/projects returns ONLY published and active projects', async () => {
      const res = await request(app).get('/api/v1/projects');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);

      // Verify that no draft project is ever returned publicly
      const titles = res.body.data.map(p => p.title);
      expect(titles).toContain('Published Test Bridge');
      expect(titles).not.toContain('Draft Test Dam');
    });

    it('GET /api/v1/projects/featured returns featured projects', async () => {
      const res = await request(app).get('/api/v1/projects/featured');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/projects/:slug returns 200 for published project', async () => {
      const res = await request(app).get('/api/v1/projects/published-test-bridge');
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Published Test Bridge');
    });

    it('GET /api/v1/projects/:slug returns 404 for draft project to anonymous user', async () => {
      const res = await request(app).get('/api/v1/projects/draft-test-dam');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/categories returns list of categories', async () => {
      const res = await request(app).get('/api/v1/categories');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('2. Public Inquiries', () => {
    it('POST /api/v1/inquiries accepts valid tender inquiry', async () => {
      const res = await request(app)
        .post('/api/v1/inquiries')
        .send({
          name: 'Rajesh Sharma',
          email: 'tender_test@contractor.com',
          phone: '+91 98765 43210',
          organization: 'Apex Coastal Engineering',
          inquiryType: 'Project Tender / RFP',
          projectLocation: 'Mumbai',
          subject: 'Viaduct Package 3 Tender Clarifications',
          message: 'Requesting clarification on structural steel grade M60 specifications.'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
    });

    it('POST /api/v1/inquiries rejects invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/inquiries')
        .send({
          name: 'Rajesh',
          email: 'invalid-email-address',
          subject: 'Test',
          message: 'Short'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('3. Authentication & Sessions', () => {
    it('POST /api/v1/auth/login rejects wrong password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test_admin@nivara.com',
          password: 'WrongPassword999!'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/login succeeds for superadmin and sets cookie', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test_admin@nivara.com',
          password: 'SuperAdminPass123!'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.role).toBe('superadmin');

      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      superadminCookie = cookies[0];
    });

    it('POST /api/v1/auth/login succeeds for editor', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test_editor@nivara.com',
          password: 'EditorPass123!'
        });

      expect(res.status).toBe(200);
      editorCookie = res.headers['set-cookie'][0];
    });

    it('GET /api/v1/auth/me returns profile when session cookie provided', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Cookie', superadminCookie);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('test_admin@nivara.com');
      expect(res.body.data.role).toBe('superadmin');
    });

    it('GET /api/v1/auth/me returns 401 without session cookie', async () => {
      const res = await request(app).get('/api/v1/auth/me');
      expect(res.status).toBe(401);
    });
  });

  describe('4. Administrative Operations & Access Controls', () => {
    it('Anonymous user cannot access /api/v1/admin/projects', async () => {
      const res = await request(app).get('/api/v1/admin/projects');
      expect(res.status).toBe(401);
    });

    it('Editor can create a new project in Draft status', async () => {
      const res = await request(app)
        .post('/api/v1/admin/projects')
        .set('Cookie', editorCookie)
        .send({
          title: 'Test Coastal Causeway',
          slug: testProjectSlug,
          category: 'Highways & Bridges',
          location: 'Gujarat Coastline',
          constructionStatus: 'Planned',
          publicationStatus: 'Draft',
          shortDescription: 'A test causeway project for automated test suite.',
          fullDescription: 'Comprehensive civil design for marine causeway spans.',
          coverImage: {
            url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c',
            alt: 'Test causeway'
          }
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe(testProjectSlug);
      testProjectId = res.body.data._id;
    });

    it('Draft project is NOT visible on public endpoint', async () => {
      const res = await request(app).get(`/api/v1/projects/${testProjectSlug}`);
      expect(res.status).toBe(404);
    });

    it('Editor can publish the project', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/projects/${testProjectId}/publish`)
        .set('Cookie', editorCookie)
        .send({ status: 'Published' });

      expect(res.status).toBe(200);
      expect(res.body.data.publicationStatus).toBe('Published');
    });

    it('Published project is NOW accessible publicly', async () => {
      const res = await request(app).get(`/api/v1/projects/${testProjectSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Test Coastal Causeway');
    });

    it('Archiving the project removes it immediately from public view', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/projects/${testProjectId}/archive`)
        .set('Cookie', editorCookie)
        .send({ status: 'Archived' });

      expect(res.status).toBe(200);
      expect(res.body.data.archiveStatus).toBe('Archived');

      // Check public endpoint
      const publicRes = await request(app).get(`/api/v1/projects/${testProjectSlug}`);
      expect(publicRes.status).toBe(404);
    });

    it('Editor CANNOT permanently delete project (Superadmin only)', async () => {
      const res = await request(app)
        .delete(`/api/v1/admin/projects/${testProjectId}`)
        .set('Cookie', editorCookie);

      expect(res.status).toBe(403);
    });

    it('Superadmin CAN permanently delete project', async () => {
      const res = await request(app)
        .delete(`/api/v1/admin/projects/${testProjectId}`)
        .set('Cookie', superadminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('Admin dashboard stats returns real metrics', async () => {
      const res = await request(app)
        .get('/api/v1/admin/stats')
        .set('Cookie', superadminCookie);

      expect(res.status).toBe(200);
      expect(res.body.data.metrics).toBeDefined();
      expect(typeof res.body.data.metrics.totalProjects).toBe('number');
      expect(typeof res.body.data.metrics.publishedProjects).toBe('number');
      expect(Array.isArray(res.body.data.recentAuditLogs)).toBe(true);
    });

    it('POST /api/v1/admin/media/sign returns signed Cloudinary parameters without exposing secret', async () => {
      const res = await request(app)
        .post('/api/v1/admin/media/sign')
        .set('Cookie', editorCookie)
        .send({ folder: 'nivara/projects' });

      expect(res.status).toBe(200);
      expect(res.body.data.signature).toBeDefined();
      expect(res.body.data.timestamp).toBeDefined();
      expect(res.body.data.apiKey).toBeDefined();
      // Crucial: API secret must never be in response
      expect(res.body.data.apiSecret).toBeUndefined();
    });
  });

  describe('5. Real Estate Property Marketing & Sales Features', () => {
    let propertyId = '';
    const propertySlug = 'test-azure-heights-residences';

    it('Admin can create a real estate property listing with developer attribution and pricing', async () => {
      const res = await request(app)
        .post('/api/v1/admin/projects')
        .set('Cookie', superadminCookie)
        .send({
          title: 'Test Azure Heights Residences',
          slug: propertySlug,
          category: 'Residential Flats & Apartments',
          location: 'Bandra West, Mumbai',
          developerName: 'Azure Skyline Developers Ltd.',
          price: '₹2.75 Cr – ₹4.50 Cr',
          priceNumeric: 27500000,
          configuration: '3 & 4 BHK Luxury Apartments',
          area: '1,850 – 2,900 sq.ft.',
          amenities: ['Clubhouse', 'Swimming Pool', 'Covered Parking', '24/7 Security'],
          reraId: 'P51800099887',
          possessionDate: 'Ready to Move',
          constructionStatus: 'Ready to Move',
          publicationStatus: 'Published',
          shortDescription: 'Modern sea-view apartments in Bandra West marketed by Nivara Infrastructure.',
          fullDescription: 'Detailed architectural overview of Azure Heights Residences developed by Azure Skyline Developers.',
          coverImage: {
            url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
            alt: 'Azure Heights Residences'
          }
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.developerName).toBe('Azure Skyline Developers Ltd.');
      expect(res.body.data.price).toBe('₹2.75 Cr – ₹4.50 Cr');
      expect(res.body.data.amenities).toHaveLength(4);
      propertyId = res.body.data._id;
    });

    it('Public endpoint returns real estate fields and allows search by developer name', async () => {
      const res = await request(app).get('/api/v1/projects?search=Azure+Skyline');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);

      const found = res.body.data.find(p => p.slug === propertySlug);
      expect(found).toBeDefined();
      expect(found.developerName).toBe('Azure Skyline Developers Ltd.');
      expect(found.price).toBe('₹2.75 Cr – ₹4.50 Cr');
      expect(found.configuration).toBe('3 & 4 BHK Luxury Apartments');
    });

    it('Public user can submit an inquiry associated with a specific property', async () => {
      const res = await request(app)
        .post('/api/v1/inquiries')
        .send({
          name: 'Pooja Mehta',
          email: 'pooja.mehta@example.com',
          phone: '+91 99887 76655',
          propertyId: propertyId,
          propertyTitle: 'Test Azure Heights Residences',
          inquiryType: 'Schedule a Site Visit',
          subject: 'Site visit request for 3 BHK unit',
          message: 'Would like to schedule a viewing this coming Saturday afternoon.'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('property advisory team');
    });

    it('Admin can view the property-linked inquiry in the inquiry inbox', async () => {
      const res = await request(app)
        .get('/api/v1/admin/inquiries?search=Pooja+Mehta')
        .set('Cookie', superadminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const inq = res.body.data.find(i => i.email === 'pooja.mehta@example.com');
      expect(inq).toBeDefined();
      expect(inq.propertyTitle).toBe('Test Azure Heights Residences');
      expect(inq.inquiryType).toBe('Schedule a Site Visit');
    });

    it('Admin cannot publish a property without a cover image', async () => {
      const res = await request(app)
        .post('/api/v1/admin/projects')
        .set('Cookie', superadminCookie)
        .send({
          title: 'Test Imageless Property',
          category: 'Residential Flats & Apartments',
          location: 'Test City',
          publicationStatus: 'Published',
          coverImage: { url: '' }
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Cannot publish property without a valid cover image');
    });

    it('Public single project response protects internal administrative fields', async () => {
      const res = await request(app).get(`/api/v1/projects/${propertySlug}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.createdBy).toBeUndefined();
      expect(res.body.data.updatedBy).toBeUndefined();
    });

    it('Cleanup: Superadmin removes test property', async () => {
      const res = await request(app)
        .delete(`/api/v1/admin/projects/${propertyId}`)
        .set('Cookie', superadminCookie);

      expect(res.status).toBe(200);
      await Inquiry.deleteMany({ email: 'pooja.mehta@example.com' });
    });
  });
});
