# Events Pages - Complete Guide

## 🎉 **New Pages Created**

Three new event pages have been added to showcase IEEE activities:

1. **Workshops** (`/workshops`)
2. **Interactive Sessions** (`/sessions`)
3. **Guest Lectures** (`/lectures`)

---

## 📄 **1. WORKSHOPS PAGE** (`/workshops`)

### **URL:** `http://localhost:3000/workshops`

### **Features:**
- ✅ **Workshop Cards** - Detailed information for each workshop
- ✅ **Level Badges** - Beginner, Intermediate, Advanced
- ✅ **Duration Display** - Hours of training
- ✅ **Seat Availability** - Number of seats
- ✅ **Topics Covered** - Key learning points
- ✅ **Instructor Info** - Expert details
- ✅ **Registration Modal** - Contact information
- ✅ **Hover Effects** - Scan lines and glowing borders

### **Workshop Information Displayed:**
```
- Title
- Description
- Date & Time
- Location
- Instructor
- Seats Available
- Level (Beginner/Intermediate/Advanced)
- Duration
- Topics Covered
- Registration Button
```

### **Sample Workshops:**
1. **IoT & Embedded Systems Workshop**
   - Arduino, Raspberry Pi, Sensor Integration
   - 6 hours, Intermediate level

2. **PCB Design & Fabrication**
   - KiCad/Eagle, Schematic Design
   - 4 hours, Beginner level

3. **Machine Learning for Engineers**
   - Python, TensorFlow, ML Algorithms
   - 8 hours, Intermediate level

4. **VLSI Design Fundamentals**
   - Verilog HDL, FPGA Implementation
   - 5 hours, Advanced level

### **Design Elements:**
- Corner accents (cyan borders)
- Level-based color coding
- Topic tags
- Scan line animation on hover
- Registration modal popup

---

## 📄 **2. INTERACTIVE SESSIONS PAGE** (`/sessions`)

### **URL:** `http://localhost:3000/sessions`

### **Features:**
- ✅ **Session Type Filter** - All, Live Coding, Workshop, Demo, Challenge
- ✅ **Type Badges** - Visual icons for each type
- ✅ **Mode Indicators** - Online, Hybrid, In-Person
- ✅ **Tool Tags** - Technologies used
- ✅ **Host Information** - Session leader details
- ✅ **Join Button** - Quick access
- ✅ **Responsive Grid** - 3 columns on desktop

### **Session Information Displayed:**
```
- Title
- Description
- Date & Time
- Location
- Mode (Online/Hybrid/In-Person)
- Host
- Participants
- Type (Live Coding/Workshop/Demo/Challenge)
- Tools & Topics
- Join Button
```

### **Session Types:**
1. **Live Coding** 🖥️
   - Real-time coding demonstrations
   - Interactive Q&A

2. **Workshop** 🛠️
   - Hands-on learning
   - Skill development

3. **Demo** 📹
   - Technology demonstrations
   - Product showcases

4. **Challenge** ⚡
   - Competitive activities
   - Problem-solving contests

### **Sample Sessions:**
1. **Live Coding: Building a Smart Home System**
   - ESP32, MQTT, Node-RED
   - Hybrid mode

2. **Hackathon Prep: Problem Solving Strategies**
   - Team collaboration, Time management
   - In-Person

3. **AI/ML Model Deployment Demo**
   - Python, Docker, AWS
   - Online

4. **Circuit Debugging Challenge**
   - Oscilloscope, Logic Analyzer
   - In-Person

5. **Web3 & Blockchain Basics**
   - Solidity, Ethereum, Web3.js
   - Hybrid

### **Design Elements:**
- Filter buttons (cyan highlight for active)
- Type-specific icons
- Mode-based color coding
- Tool tags (limited to 3 visible)
- Corner accents with hover effects

---

## 📄 **3. GUEST LECTURES PAGE** (`/lectures`)

### **URL:** `http://localhost:3000/lectures`

### **Features:**
- ✅ **Speaker Profiles** - Photo, name, designation
- ✅ **Company/Institution** - Affiliation details
- ✅ **Bio Summary** - Expert background
- ✅ **Type Badges** - Industry Expert, Academic, Researcher, Entrepreneur
- ✅ **Social Links** - LinkedIn, Website
- ✅ **Key Topics** - Lecture highlights
- ✅ **Reservation Modal** - Seat booking info
- ✅ **Expected Attendees** - Audience size

### **Lecture Information Displayed:**
```
- Speaker Name & Photo
- Designation
- Company/Institution
- Bio
- Lecture Title
- Date & Time
- Location
- Expected Attendees
- Type (Industry Expert/Academic/Researcher/Entrepreneur)
- Key Topics
- Social Links
- Reserve Seat Button
```

### **Speaker Types:**
1. **Industry Expert** 💼
   - Corporate professionals
   - Tech leaders

2. **Academic** 🎓
   - Professors
   - University researchers

3. **Researcher** 🔬
   - Lab directors
   - Scientists

4. **Entrepreneur** 🚀
   - Startup founders
   - Business leaders

### **Sample Lectures:**
1. **Future of AI in Healthcare**
   - Dr. Amit Patel, MedTech Solutions
   - AI in Diagnostics, Medical Imaging

2. **Quantum Computing: Theory to Practice**
   - Prof. Sarah Johnson, MIT
   - Quantum Algorithms, Real Applications

3. **Building Scalable Microservices**
   - Rajesh Kumar, Google
   - Docker, Kubernetes, Cloud Architecture

4. **Renewable Energy Innovations**
   - Dr. Priya Sharma, Solar Innovations Lab
   - Solar Cell Technology, Sustainability

5. **Cybersecurity in IoT Age**
   - Michael Chen, CyberDefense Corp
   - IoT Security, Penetration Testing

6. **Entrepreneurship: Idea to IPO**
   - Ananya Verma, TechStart Ventures
   - Startup Journey, Funding, Scaling

### **Design Elements:**
- Circular speaker photos with cyan border
- Type-specific icons and badges
- Social media links
- Topic tags (rounded pills)
- Reservation modal with contact info
- Corner accents and scan lines

---

## 🎨 **Common Design Features**

All three pages share:

### **Visual Elements:**
- **Dark Theme** - Black background with gradients
- **Cyan Accents** - Primary color for highlights
- **Corner Borders** - Hexagonal/angular frames
- **Scan Line Animation** - Vertical sweep on hover
- **Gradient Backgrounds** - From #1a1a2e to #0f0f1e
- **Orbitron Font** - For titles and headers

### **Interactive Elements:**
- **Hover Effects** - Border glow, color changes
- **Smooth Transitions** - 300ms duration
- **Modal Popups** - Registration/reservation forms
- **Responsive Grid** - Mobile to desktop layouts

### **Typography:**
- **Titles** - Orbitron, bold, uppercase
- **Body** - Default font, white/60 opacity
- **Highlights** - Cyan-400 color
- **Labels** - Small, uppercase, tracking-wider

---

## 🧭 **Navigation**

### **Updated Navbar:**
The navbar now has an **"EVENTS"** dropdown with:
- Workshops
- Interactive Sessions
- Guest Lectures

### **Access:**
```
Navbar → EVENTS → Select page
```

Or directly:
- `/workshops`
- `/sessions`
- `/lectures`

---

## 📊 **Content Structure**

### **Workshops:**
```javascript
{
  id: number,
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  instructor: string,
  seats: number,
  level: "Beginner" | "Intermediate" | "Advanced",
  duration: string,
  topics: string[],
  image: string
}
```

### **Interactive Sessions:**
```javascript
{
  id: number,
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  mode: "Online" | "Hybrid" | "In-Person",
  host: string,
  participants: number,
  type: "Live Coding" | "Workshop" | "Demo" | "Challenge",
  tools: string[],
  image: string
}
```

### **Guest Lectures:**
```javascript
{
  id: number,
  title: string,
  speaker: string,
  designation: string,
  company: string,
  bio: string,
  date: string,
  time: string,
  location: string,
  attendees: number,
  topics: string[],
  linkedin: string,
  website: string,
  image: string,
  type: "Industry Expert" | "Academic" | "Researcher" | "Entrepreneur"
}
```

---

## 🎯 **Key Features Summary**

| Feature | Workshops | Sessions | Lectures |
|---------|-----------|----------|----------|
| **Filter/Sort** | ❌ | ✅ Type filter | ❌ |
| **Registration** | ✅ Modal | ✅ Join button | ✅ Modal |
| **Speaker Info** | ✅ Instructor | ✅ Host | ✅ Full profile |
| **Level Indicator** | ✅ 3 levels | ❌ | ❌ |
| **Mode Display** | ❌ | ✅ 3 modes | ❌ |
| **Social Links** | ❌ | ❌ | ✅ LinkedIn, Web |
| **Topics Tags** | ✅ | ✅ | ✅ |
| **Duration** | ✅ Hours | ❌ | ✅ Time range |
| **Capacity** | ✅ Seats | ✅ Participants | ✅ Attendees |

---

## 🚀 **How to Use**

### **For Visitors:**
1. Navigate to any events page
2. Browse available events
3. Click "Register" or "Join" button
4. View contact information
5. Register through IEEE portal

### **For Admins (Future):**
These pages currently use mock data. To make them dynamic:
1. Create API endpoints for each event type
2. Add admin dashboard tabs
3. Connect to MongoDB
4. Enable CRUD operations

---

## 📱 **Responsive Design**

### **Desktop (1200px+):**
- Workshops: 2 columns
- Sessions: 3 columns
- Lectures: 2 columns

### **Tablet (768px - 1199px):**
- Workshops: 2 columns
- Sessions: 2 columns
- Lectures: 2 columns

### **Mobile (< 768px):**
- All: 1 column
- Stacked layout
- Full-width cards

---

## 🎨 **Color Scheme**

### **Backgrounds:**
- Page: `#000000` (black)
- Cards: `linear-gradient(#1a1a2e, #0f0f1e)`
- Accents: `#0f0f1e`

### **Text:**
- Primary: `#ffffff`
- Secondary: `rgba(255,255,255,0.6)`
- Highlights: `#22d3ee` (cyan-400)

### **Badges:**
- Beginner: Green (`#10b981`)
- Intermediate: Yellow (`#eab308`)
- Advanced: Red (`#ef4444`)
- Online: Blue (`#3b82f6`)
- Hybrid: Purple (`#a855f7`)
- In-Person: Green (`#10b981`)

---

## ✅ **Files Created**

1. ✅ `/src/app/workshops/page.tsx` - Workshops page
2. ✅ `/src/app/sessions/page.tsx` - Interactive sessions page
3. ✅ `/src/app/lectures/page.tsx` - Guest lectures page
4. ✅ Updated `/src/components/layout/Navbar.tsx` - Navigation links

---

## 🎉 **Summary**

All three event pages are now live and accessible! They feature:
- Modern, futuristic design
- Detailed event information
- Interactive elements
- Registration/booking functionality
- Responsive layouts
- Consistent styling

**Visit them now:**
- http://localhost:3000/workshops
- http://localhost:3000/sessions
- http://localhost:3000/lectures

🚀 **Ready to showcase IEEE events in style!**
