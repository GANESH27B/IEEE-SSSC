# Photo Upload Feature - Complete Guide

## ✅ Available in Both Dashboards!

Photo upload from PC is now available in **both Admin and Member dashboards**!

---

## 📤 **Admin Dashboard** - Full Control

### Access:
- **URL**: `http://localhost:3000/login`
- **Email**: `admin@ieee.org`
- **Password**: `admin123`

### Features:
1. **Team Tab** - Upload team member photos
2. **Gallery Tab** - Upload event photos
3. **Full CRUD** - Create, Edit, Delete all content

---

## 👥 **Member Dashboard** - Contribute Content

### Access:
- **URL**: `http://localhost:3000/login`
- **Email**: (created by admin)
- **Password**: (set by admin)

### Features:
1. **Add Gallery** - Upload event photos
2. **Add Team** - Upload team member photos
3. **View Recent** - See recently added content

---

## 🎯 How to Upload Photos

### **Option 1: Upload from PC** ⭐ (Recommended)

1. Click **"Choose Photo"** button
2. Select image file from your computer
3. Wait for upload (shows "Uploading...")
4. Preview appears automatically
5. Click **X** to remove if needed

### **Option 2: Paste Image URL**

1. Scroll to "Or paste image URL"
2. Paste direct image link
3. Example: `https://example.com/photo.jpg`

---

## 📸 Photo Types

### **Gallery Photos** (Events)
- **Format**: Rectangular preview
- **Use For**: Event photos, workshop images, competition pictures
- **Preview**: 16x16 rounded corners

### **Team Photos** (Members)
- **Format**: Circular preview
- **Use For**: Team member headshots, profile pictures
- **Preview**: 16x16 circular

---

## 💡 Tips for Best Results

### **Gallery Photos:**
- Use landscape or square images
- Event photos, group shots work well
- Recommended: 1200x800px or larger

### **Team Photos:**
- Use square images (1:1 ratio)
- Professional headshots work best
- Recommended: 500x500px or larger
- Will be displayed in circular frames

---

## 🔧 Technical Details

### **Upload Process:**
1. User selects file
2. File sent to `/api/upload`
3. Saved to `public/uploads/[timestamp]-[filename]`
4. Returns URL: `/uploads/[timestamp]-[filename]`
5. URL stored in MongoDB

### **Storage:**
- **Location**: `public/uploads/`
- **Naming**: `[timestamp]-[original-filename]`
- **Example**: `1707134567890-john-doe.jpg`
- **Access**: `http://localhost:3000/uploads/1707134567890-john-doe.jpg`

### **Supported Formats:**
- JPG/JPEG
- PNG
- GIF
- WebP
- All standard image formats

---

## 🎨 UI Features

### **Upload Button:**
- Shows "Choose Photo" when ready
- Shows "Uploading..." during upload
- Disabled during upload (gray)
- Enabled after upload (cyan)

### **Preview:**
- Appears immediately after upload
- Gallery: Rounded corners
- Team: Circular
- Border: Cyan (2px)

### **Remove Button:**
- Red X icon
- Hover effect (lighter red)
- Clears image instantly

---

## 📋 Complete Workflow Examples

### **Admin Adding Team Member:**
```
1. Login → Admin Dashboard
2. Click "Team" tab
3. Click "Add Team Member"
4. Fill: Name, Role, Department, Year
5. Click "Choose Photo"
6. Select photo from PC
7. Wait for upload
8. See circular preview
9. Click "Create"
10. Done! ✅
```

### **Member Adding Gallery Item:**
```
1. Login → Member Dashboard
2. Click "Add Gallery"
3. Fill: Title, Category, Description
4. Click "Choose Photo"
5. Select event photo from PC
6. Wait for upload
7. See rectangular preview
8. Click "Add Gallery Item"
9. Done! ✅
```

---

## 🚀 Quick Start

### **For Admins:**
1. Login to admin dashboard
2. Navigate to Team or Gallery tab
3. Click "Choose Photo" button
4. Upload and save!

### **For Members:**
1. Login to member dashboard
2. Go to "Add Gallery" or "Add Team"
3. Click "Choose Photo" button
4. Upload and save!

---

## 🔒 Security Notes

### **Current Implementation:**
- Files stored locally in `public/uploads/`
- No file size limits (yet)
- No file type validation (accepts all images)
- No authentication on upload endpoint

### **For Production:**
Consider adding:
- File size limits (e.g., 5MB max)
- File type validation
- Image compression
- Virus scanning
- Cloud storage (AWS S3, Cloudinary)
- Authentication on upload endpoint

---

## 📊 Summary

| Feature | Admin | Member |
|---------|-------|--------|
| Upload Gallery Photos | ✅ | ✅ |
| Upload Team Photos | ✅ | ✅ |
| Edit/Delete | ✅ | ❌ |
| View All | ✅ | Recent Only |
| Manage Users | ✅ | ❌ |

Both dashboards now have full photo upload capabilities! 🎉
