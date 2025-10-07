# Mini Healthcare App

A full-stack healthcare application that allows patients to register, log in, book appointments, view treatment plans, and track their health progress.

## 🚀 Live Demo
- **Frontend**: [Your Deployed Frontend URL]
- **Backend API**: [Your Deployed Backend URL]
- **Repository**: [Your GitHub Repository URL]

## 📋 Submission Checklist
- ✅ /frontend folder with React application
- ✅ /backend folder with Node.js API
- ✅ Working instructions in README.md
- ✅ Deployed version of the web app
- ✅ GitHub repository with complete code
- ✅ Environment configuration files
- ✅ Dependencies and package.json files

## Project Structure

```
mini-healthcare-app/
├── frontend/          # React.js frontend application
├── backend/           # Node.js Express.js backend API
└── README.md          # Project documentation
```

## Tech Stack

### Frontend
- **Framework**: React.js
- **Routing**: React Router DOM
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware

## Core Features

### 1. Authentication
- **Register**: Patient creates an account (Name, Email, Password)
- **Login**: Email & Password authentication using JWT
- **Auto-redirect**: After login, redirect to Dashboard
- **Token Storage**: JWT tokens stored in localStorage

### 2. Appointment Booking
Patients can:
- View list of available doctors (hardcoded with specialties)
- Book appointments with:
  - Doctor Name
  - Date
  - Time

**Backend Routes:**
- `GET /api/doctors` – Get doctor list
- `POST /api/appointment` – Book appointment (requires auth)
- `GET /api/appointments` – View booked appointments (requires auth)

### 3. Treatment Plan (Auto-generated)
After booking an appointment, a sample treatment plan is automatically generated:
```json
{
  "diagnosis": "Migraine",
  "recommended_medicines": ["Medicine A", "Medicine B"],
  "lifestyle_advice": "Drink more water, sleep early"
}
```

### 4. Patient Health Tracking
Simple health tracking form with:
- **Pain Level** (1–10)
- **Energy Level** (1–10)
- **Notes** (optional)

Shows a list of all tracking entries below the form.

**Backend Routes:**
- `POST /api/track` – Add a tracking entry (requires auth)
- `GET /api/track` – Fetch all tracking entries for logged-in user (requires auth)

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas) - [Setup guide](https://docs.mongodb.com/manual/installation/)
- **npm** (comes with Node.js) or **yarn**
- **Git** for cloning the repository

### 🚀 Quick Start (Recommended)

#### Option 1: Automated Setup
```bash
# Clone the repository
git clone https://github.com/Jayakrishna-1817/react-3.git
cd mini-healthcare-app

# Run the setup script (Windows)
setup.bat

# Or for Linux/Mac
chmod +x setup.sh
./setup.sh
```

#### Option 2: Manual Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Jayakrishna-1817/react-3.git
cd mini-healthcare-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Linux/Mac

# Edit the .env file with your MongoDB connection details
# Use notepad, VS Code, or any text editor
notepad .env
```

**Required .env Configuration:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare
JWT_SECRET=your-super-secret-key-change-in-production
```

**Start the backend server:**
```bash
# Development mode (recommended for development)
npm run dev

# Production mode
npm start
```

✅ **Backend successfully running at:** `http://localhost:5000`

### 3. Frontend Setup
Open a **new terminal window** and:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

✅ **Frontend successfully running at:** `http://localhost:3000`

### 4. Database Setup Options

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```
3. Use connection string: `mongodb://localhost:27017/healthcare`

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Create free account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get connection string and update `.env` file
4. Add your IP to whitelist in Atlas dashboard

### 5. Verify Installation
1. **Backend Test**: Visit `http://localhost:5000/api/doctors`
   - Should return list of doctors in JSON format
2. **Frontend Test**: Visit `http://localhost:3000`
   - Should show the healthcare app homepage
3. **Database Test**: Try registering a new user
   - Should create user without errors

## Environment Variables

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare
JWT_SECRET=your-super-secret-key-change-in-production
```

## API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new patient | No |
| POST | `/api/auth/login` | Login patient | No |
| GET | `/api/doctors` | Get list of doctors | No |
| POST | `/api/appointment` | Book new appointment | Yes |
| GET | `/api/appointments` | Get patient's appointments | Yes |
| POST | `/api/track` | Add health tracking entry | Yes |
| GET | `/api/track` | Get patient's tracking entries | Yes |

### Authentication
- Protected routes require `Authorization: Bearer <token>` header
- JWT tokens expire in 7 days
- Tokens are stored in localStorage on the frontend

## 📖 Usage Instructions

### Getting Started
1. **Ensure both servers are running:**
   - Backend: `http://localhost:5000` ✅
   - Frontend: `http://localhost:3000` ✅

2. **Access the application:**
   - Open your web browser
   - Navigate to `http://localhost:3000`

### Step-by-Step User Journey

#### 1. 👤 **User Registration**
- Click "Register" on the homepage
- Fill in the registration form:
  - **Full Name**: Your complete name
  - **Email**: Valid email address
  - **Password**: Minimum 6 characters
- Click "Register" button
- ✅ Success: Automatically redirected to dashboard

#### 2. 🔐 **User Login**
- Click "Login" if you already have an account
- Enter your email and password
- Click "Login" button
- ✅ Success: Redirected to your personal dashboard

#### 3. 🏥 **Dashboard Overview**
Once logged in, you'll see four main sections:

**A. Appointment Booking Section**
- **Doctor Selection**: Choose from available doctors
  - Dr. Alice Nguyen (Neurology)
  - Dr. Ben Carter (Internal Medicine)
  - Dr. Sara Patel (Family Medicine)
- **Date Selection**: Pick your preferred appointment date
- **Time Selection**: Choose available time slot
- Click "Book Appointment"

**B. Treatment Plan Section**
- Automatically appears after booking an appointment
- Shows auto-generated treatment plan with:
  - Diagnosis
  - Recommended medicines
  - Lifestyle advice

**C. Health Tracking Section**
- **Pain Level**: Rate from 1 (no pain) to 10 (severe pain)
- **Energy Level**: Rate from 1 (very low) to 10 (very high)
- **Notes**: Optional additional comments
- Click "Add Entry" to save

**D. History Sections**
- **Your Appointments**: List of all booked appointments
- **Your Health Tracking**: List of all tracking entries

#### 4. 📅 **Booking an Appointment**
1. In the "Book Appointment" section:
   - Select a doctor from dropdown
   - Choose a date (today or future)
   - Pick a time slot
2. Click "Book Appointment"
3. ✅ Appointment confirmed and added to your list
4. 🔄 Treatment plan automatically generated

#### 5. 📊 **Health Tracking**
1. In the "Health Tracking" section:
   - Move the pain level slider (1-10)
   - Move the energy level slider (1-10)
   - Add any notes about your health
2. Click "Add Entry"
3. ✅ Entry saved and appears in tracking history

#### 6. 📱 **Navigation**
- **Dashboard**: Main hub with all features
- **Profile**: View your account information
- **Logout**: Sign out securely

### 🔧 Troubleshooting Common Issues

#### Frontend Won't Load
```bash
# Check if frontend is running
cd frontend
npm start
```

#### Backend API Errors
```bash
# Check if backend is running
cd backend
npm run dev
```

#### Database Connection Issues
1. Verify MongoDB is running
2. Check `.env` file configuration
3. For Atlas: Check IP whitelist and credentials

#### Can't Register/Login
1. Check browser console for errors
2. Verify backend is running on port 5000
3. Check network tab in browser dev tools

### 💡 Tips for Best Experience
- Use Chrome or Firefox for best compatibility
- Keep both terminal windows open while using the app
- Check browser console for any error messages
- Refresh the page if something doesn't load properly

## Sample Data

The application includes sample doctors:
- Dr. Alice Nguyen (Neurology)
- Dr. Ben Carter (Internal Medicine)  
- Dr. Sara Patel (Family Medicine)

## 👨‍💻 Development

### Development Workflow

#### Backend Development
```bash
cd backend

# Start development server with auto-restart
npm run dev

# The server will automatically restart when you make changes
# Runs on http://localhost:5000
```

**Backend File Structure:**
```
backend/
├── server.js           # Main server file
├── models/            # Database models
│   ├── User.js        # User schema
│   ├── Appointment.js # Appointment schema
│   └── Track.js       # Health tracking schema
├── routes/            # API routes
│   ├── auth.js        # Authentication routes
│   ├── appointments.js # Appointment routes
│   ├── doctors.js     # Doctor routes
│   └── track.js       # Health tracking routes
└── .env              # Environment variables
```

#### Frontend Development
```bash
cd frontend

# Start development server with hot reload
npm start

# Runs on http://localhost:3000
# Auto-opens in your default browser
```

**Frontend File Structure:**
```
frontend/src/
├── App.js                    # Main app component
├── index.js                  # App entry point
├── index.css                # Global styles
├── components/
│   ├── Auth/
│   │   ├── Login.js         # Login component
│   │   └── Register.js      # Register component
│   ├── Dashboard/
│   │   └── Dashboard.js     # Main dashboard
│   └── ProtectedRoute.js    # Route protection
└── context/
    └── AuthContext.js       # Authentication context
```

### 🔧 Development Commands

#### Backend Commands
```bash
# Install new package
npm install package-name

# Start development mode
npm run dev

# Start production mode
npm start

# Check for issues
npm audit
```

#### Frontend Commands
```bash
# Install new package
npm install package-name

# Start development
npm start

# Build for production
npm run build

# Test the app
npm test

# Preview production build
npm run preview
```

### 🛠️ Making Changes

#### Adding New API Endpoints
1. Create route in `backend/routes/`
2. Add route to `server.js`
3. Test with Postman or browser

#### Adding New Frontend Components
1. Create component in `frontend/src/components/`
2. Import and use in parent component
3. Add routing if needed in `App.js`

#### Database Schema Changes
1. Modify model files in `backend/models/`
2. Restart backend server
3. Test with new data structure

### 🧪 Testing Your Changes

#### Backend Testing
```bash
# Test API endpoints
curl http://localhost:5000/api/doctors
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","password":"password"}'
```

#### Frontend Testing
1. Check browser console for errors
2. Test all user flows manually
3. Verify responsive design on different screen sizes
```bash
cd frontend
npm start   # Starts React development server
```

## Deployment

### Quick Start (Local Development)
```bash
# Clone the repository
git clone <your-repository-url>
cd mini-healthcare-app

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection
npm run dev

# Setup Frontend (in new terminal)
cd ../frontend
npm install
npm start
```

### Production Deployment

#### Option 1: Deploy to Render (Recommended)

**Backend Deployment:**
1. Push your code to GitHub
2. Connect your GitHub repo to [Render](https://render.com)
3. Create a new Web Service
4. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: 5000
5. Deploy command: `npm start`

**Frontend Deployment:**
1. Create a new Static Site on Render
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL=<your-backend-url>`

#### Option 2: Deploy to Netlify + Railway

**Backend (Railway):**
1. Connect GitHub repo to [Railway](https://railway.app)
2. Deploy backend folder
3. Add environment variables in Railway dashboard

**Frontend (Netlify):**
1. Run `npm run build` in frontend folder
2. Drag and drop `build` folder to [Netlify](https://netlify.com)
3. Set environment variables in Netlify settings

#### Option 3: Deploy to Vercel

**Backend:**
```bash
cd backend
npx vercel
# Follow prompts and set environment variables
```

**Frontend:**
```bash
cd frontend
npx vercel
# Follow prompts
```

### Database Setup (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI`
4. Whitelist your deployment platform's IP addresses

## License

This project is for educational purposes as part of a Full Stack Developer Intern Assignment.
