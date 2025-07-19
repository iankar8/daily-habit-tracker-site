# Deploy Your Flowcard Tracker to Vercel

## Quick Setup (2 minutes)

### Step 1: Download Your Files
1. Download these files from your tracker app:
   - `index.html`
   - `style.css`  
   - `app.js`

### Step 2: Create Project Folder
1. Create a new folder on your computer called `flowcard-tracker`
2. Put all three files in this folder

### Step 3: Deploy to Vercel

**Option A: Drag & Drop (Easiest)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub, GitLab, or Bitbucket
3. Click "Add New..." → "Project"
4. Drag your `flowcard-tracker` folder directly onto the page
5. Click "Deploy" 
6. Your site will be live in ~30 seconds!

**Option B: Git Repository (Recommended for updates)**
1. Create a new GitHub repository
2. Upload your files to the repo
3. Connect the repo to Vercel
4. Auto-deploys when you push changes

### Step 4: Custom Domain (Optional)
- In Vercel dashboard → Settings → Domains
- Add your custom domain (e.g., `flowcard.yourdomain.com`)

## Your Updated Features
✅ **12-hour format** - All times now show as 7:00 AM, 1:00 PM, 10:00 PM  
✅ **Real-time current activity** - Hero section shows what you should be doing now  
✅ **Smart time-based styling** - Past activities are grayed out  
✅ **Tabbed interface** - Clean navigation between Today/Workouts/Nutrition  
✅ **Progress tracking** - See completion percentage throughout the day  
✅ **Color-coded activities** - Blue=workout, Green=work, Orange=nutrition, Purple=recovery  

## Pro Tips
- Bookmark the live URL on your phone for quick access
- The app works offline once loaded
- Checkboxes reset automatically at midnight
- Use as a PWA by "Add to Home Screen" on mobile

Your Vercel URL will look like: `https://flowcard-tracker-abc123.vercel.app`