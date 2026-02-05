# Quick Setup Script for IEEE Website

## Create Admin Account

You're getting "Invalid credentials" because the admin account doesn't exist in MongoDB yet.

### **Option 1: Use the Setup API (Easiest)**

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open a new terminal and run:
   ```bash
   curl -X POST http://localhost:3000/api/setup/admin
   ```

   **OR** Open your browser and go to:
   ```
   http://localhost:3000/api/setup/admin
   ```

3. You should see:
   ```json
   {
     "success": true,
     "message": "Admin account created successfully"
   }
   ```

4. Now try logging in again with:
   - Email: `admin@ieee.org`
   - Password: `admin123`

---

### **Option 2: Using MongoDB Compass (GUI)**

1. **Download MongoDB Compass:**
   - https://www.mongodb.com/try/download/compass

2. **Connect to your database:**
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **Create the admin account:**
   - Click on `ieee-website` database (or create it)
   - Click on `members` collection (or create it)
   - Click "ADD DATA" → "Insert Document"
   - Paste this:
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
   - Click "Insert"

4. **Try logging in again!**

---

### **Option 3: Using MongoDB Shell**

1. **Open MongoDB Shell:**
   ```bash
   mongosh
   ```

2. **Create the admin account:**
   ```javascript
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

3. **Verify it was created:**
   ```javascript
   db.members.find({ email: "admin@ieee.org" })
   ```

4. **Exit:**
   ```javascript
   exit
   ```

---

## Troubleshooting

### **MongoDB Not Running?**

**Check if MongoDB is running:**
```bash
mongosh
```

If you get an error, MongoDB isn't running.

**Start MongoDB:**
- **Windows:** MongoDB should start automatically as a service
- **Mac:** `brew services start mongodb-community`
- **Linux:** `sudo systemctl start mongod`

### **Still Getting "Invalid credentials"?**

1. **Check your `.env.local` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/ieee-website
   ```

2. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

3. **Check the terminal for MongoDB connection errors**

---

## After Setup

Once the admin account is created:

1. ✅ Login at: `http://localhost:3000/login`
2. ✅ Email: `admin@ieee.org`
3. ✅ Password: `admin123`
4. ✅ You'll be redirected to `/admin`
5. ✅ Create member accounts from the "Members" tab!

---

## Quick Test

After creating the admin account, test the login API:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ieee.org","password":"admin123"}'
```

You should see:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@ieee.org",
    "role": "admin",
    ...
  }
}
```
