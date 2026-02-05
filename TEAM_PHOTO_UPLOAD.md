# Team Photo Upload Feature

## ✅ How to Add Team Members with Photos

### Step 1: Login to Admin Dashboard
- Go to: `http://localhost:3000/login`
- Email: `admin@ieee.org`
- Password: `admin123`

### Step 2: Navigate to Team Tab
- Click **"Team"** in the sidebar

### Step 3: Add New Team Member
- Click **"Add Team Member"** button
- Fill in the details:
  - **Name**: Full name of the team member
  - **Role**: Position (e.g., President, Vice President, Secretary)
  - **Department**: ECE, CSE, etc.
  - **Year**: Final Year, Third Year, etc.

### Step 4: Upload Photo (2 Options)

#### **Option 1: Upload from Computer** ⭐ (Recommended)
1. Click the **"Choose Photo"** button
2. Select an image file from your computer
3. Wait for "Uploading..." to complete
4. Preview will appear automatically
5. Click the **X** button to remove if needed

#### **Option 2: Paste Image URL**
1. Scroll down to "Or paste image URL"
2. Paste a direct image link
3. Example: `https://example.com/photo.jpg`

### Step 5: Save
- Click **"Create"** button
- Team member will be added with the photo!

---

## 📸 Photo Requirements

- **Formats**: JPG, PNG, GIF, WebP
- **Recommended**: Square images work best (they'll be displayed in circles)
- **Size**: Any size (will be automatically resized for display)

---

## 🔧 Technical Details

- **Upload API**: `/api/upload`
- **Storage**: `public/uploads/`
- **File Naming**: Automatic timestamp prefix to prevent conflicts
- **Example**: `1707134567890-john-doe.jpg`

---

## 🎯 Features

✅ **File Upload**: Choose photos directly from your PC
✅ **Live Preview**: See the photo before saving
✅ **Remove Option**: Delete uploaded photo with one click
✅ **URL Support**: Still works with external image URLs
✅ **Upload Status**: Shows "Uploading..." during upload

---

## 💡 Tips

- Use professional headshots for best results
- Square images (1:1 ratio) look best in circular frames
- Keep file sizes reasonable (under 5MB recommended)
- Photos are stored permanently in `public/uploads/`

Enjoy managing your team! 🚀
