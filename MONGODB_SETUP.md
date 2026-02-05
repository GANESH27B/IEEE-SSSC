# MongoDB Setup Guide for IEEE Website

## Option 1: Local MongoDB (Recommended for Development)

### Install MongoDB Locally

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows service
4. Default connection: `mongodb://localhost:27017`

**Verify Installation:**
```bash
mongosh
```

### Start Using Local MongoDB
Your `.env.local` is already configured for local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/ieee-website
```

Just restart your Next.js server:
```bash
npm run dev
```

---

## Option 2: MongoDB Atlas (Cloud - Free Tier Available)

### Setup MongoDB Atlas

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User:**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role to "Atlas Admin"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`

6. **Update .env.local:**
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/ieee-website?retryWrites=true&w=majority
   ```
   Replace:
   - `your-username` with your database username
   - `your-password` with your database password

7. **Restart Server:**
   ```bash
   npm run dev
   ```

---

## Verify Database Connection

1. Start your Next.js server:
   ```bash
   npm run dev
   ```

2. Go to admin panel:
   ```
   http://localhost:3000/login
   ```

3. Login with admin credentials:
   ```
   Email: admin@ieee.org
   Password: admin123
   ```

4. Try adding a gallery item or team member
5. Data should now persist in MongoDB!

---

## Database Collections

Your database will have two collections:

1. **galleries** - Stores gallery items
   - title
   - description
   - image
   - category
   - createdAt

2. **teammembers** - Stores team members
   - name
   - role
   - department
   - year
   - image
   - createdAt

---

## Troubleshooting

### Connection Error
- Check if MongoDB is running (local)
- Verify connection string in `.env.local`
- Check IP whitelist (Atlas)
- Verify username/password (Atlas)

### Data Not Saving
- Check browser console for errors
- Check terminal for API errors
- Verify MongoDB connection

### Need Help?
- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/docs/

---

## Next Steps

After setting up MongoDB:
1. ✅ All gallery items will be saved to database
2. ✅ All team members will be saved to database
3. ✅ Data persists across server restarts
4. ✅ Ready for production deployment!
