# IEEE Website - Member Management System

## 🎯 System Overview

Your IEEE website now has a complete member management system with MongoDB integration!

### **Three User Types:**

1. **Admin** - Full control over everything
2. **Member** - Can add gallery items and team members
3. **Public** - Can view the website

---

## 🔐 How It Works

### **1. Admin Creates Member Accounts**

Admins can create member accounts from the admin dashboard:
- Go to `/admin` (after logging in as admin)
- Navigate to "Members" tab (you'll need to add this)
- Create new member accounts with:
  - Name
  - Email
  - Password
  - Department
  - Year
  - Role (admin or member)

### **2. Members Login**

Members use their credentials to login:
- Go to `/login`
- Enter email and password
- System automatically detects role from database
- **Admin** → Redirected to `/admin`
- **Member** → Redirected to `/member`

### **3. Member Dashboard**

Members can:
- ✅ Add new gallery items
- ✅ Add new team members
- ✅ View recent additions
- ❌ Cannot edit or delete (only admins can)

---

## 📁 File Structure

```
src/
├── app/
│   ├── admin/page.tsx          # Admin dashboard (full CRUD)
│   ├── member/page.tsx         # Member dashboard (add only)
│   ├── login/page.tsx          # Login page (API integrated)
│   └── api/
│       ├── auth/
│       │   └── login/route.ts  # Login API
│       ├── members/
│       │   ├── route.ts        # Get all/create members
│       │   └── [id]/route.ts   # Get/update/delete member
│       ├── gallery/
│       │   ├── route.ts        # Get all/create gallery
│       │   └── [id]/route.ts   # Get/update/delete gallery
│       └── team/
│           ├── route.ts        # Get all/create team
│           └── [id]/route.ts   # Get/update/delete team
├── models/
│   ├── Member.ts               # Member schema
│   ├── Gallery.ts              # Gallery schema
│   └── TeamMember.ts           # Team member schema
└── lib/
    └── mongodb.ts              # Database connection
```

---

## 🚀 Setup Instructions

### **Step 1: Install MongoDB**

**Option A: Local MongoDB (Recommended for Development)**
1. Download: https://www.mongodb.com/try/download/community
2. Install and it will run automatically
3. Connection string: `mongodb://localhost:27017/ieee-website`

**Option B: MongoDB Atlas (Cloud - Free)**
1. Create account: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `.env.local`

### **Step 2: Configure Environment**

Your `.env.local` is already set up:
```env
MONGODB_URI=mongodb://localhost:27017/ieee-website
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### **Step 3: Create First Admin Account**

You need to manually create the first admin account in MongoDB:

**Using MongoDB Compass (GUI):**
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect to `mongodb://localhost:27017`
3. Create database: `ieee-website`
4. Create collection: `members`
5. Insert document:
```json
{
  "name": "Admin User",
  "email": "admin@ieee.org",
  "password": "admin123",
  "role": "admin",
  "department": "Administration",
  "year": "Staff",
  "isActive": true,
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

**Using MongoDB Shell:**
```bash
mongosh
use ieee-website
db.members.insertOne({
  name: "Admin User",
  email: "admin@ieee.org",
  password: "admin123",
  role: "admin",
  department: "Administration",
  year: "Staff",
  isActive: true,
  createdAt: new Date()
})
```

### **Step 4: Start the Application**

```bash
npm run dev
```

### **Step 5: Login as Admin**

1. Go to: `http://localhost:3000/login`
2. Email: `admin@ieee.org`
3. Password: `admin123`
4. You'll be redirected to `/admin`

---

## 👥 Creating Member Accounts

### **From Admin Dashboard:**

Currently, the admin dashboard has Gallery and Team tabs. You need to add a "Members" tab.

**Quick way to create members:**

Use the API directly or MongoDB Compass to insert member documents:

```json
{
  "name": "John Doe",
  "email": "john@ieee.org",
  "password": "password123",
  "role": "member",
  "department": "ECE",
  "year": "Third Year",
  "isActive": true,
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

---

## 🔑 Login Flow

```
User enters credentials
        ↓
POST /api/auth/login
        ↓
Check database for user
        ↓
    Valid user?
    ↙        ↘
  YES         NO
   ↓           ↓
Check role   Return error
   ↓
Admin or Member?
↙            ↘
Admin        Member
↓             ↓
/admin      /member
```

---

## 📊 Database Collections

### **members**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  role: "admin" | "member",
  department: String,
  year: String,
  isActive: Boolean,
  createdAt: Date
}
```

### **galleries**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String,
  category: "Workshop" | "Competition" | "Event" | "Lecture",
  createdAt: Date
}
```

### **teammembers**
```javascript
{
  _id: ObjectId,
  name: String,
  role: String,
  department: String,
  year: String,
  image: String,
  createdAt: Date
}
```

---

## 🛡️ Security Notes

⚠️ **IMPORTANT:** This is a development setup. For production:

1. **Hash passwords** using bcrypt
2. **Use JWT tokens** for session management
3. **Add API authentication** middleware
4. **Validate all inputs** on server side
5. **Use HTTPS** in production
6. **Add rate limiting** to prevent brute force
7. **Implement CSRF protection**

---

## 🎨 Next Steps

### **Add Members Tab to Admin Dashboard:**

1. Add "Members" to the sidebar navigation
2. Create member management UI
3. Add create/edit/delete functionality
4. Display member list with roles

### **Enhance Member Dashboard:**

1. Show member's own profile
2. Add upload functionality for images
3. Add activity log
4. Add notifications

### **Add Features:**

1. Password reset functionality
2. Email verification
3. Profile picture upload
4. Activity tracking
5. Approval workflow for member submissions

---

## 📞 Support

If you encounter issues:

1. Check MongoDB is running: `mongosh`
2. Check `.env.local` configuration
3. Check browser console for errors
4. Check terminal for API errors
5. Verify database collections exist

---

## 🎉 You're All Set!

Your IEEE website now has:
- ✅ MongoDB integration
- ✅ User authentication
- ✅ Role-based access control
- ✅ Admin dashboard
- ✅ Member dashboard
- ✅ API routes for all operations
- ✅ Database models

Happy coding! 🚀
