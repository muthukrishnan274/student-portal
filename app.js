/* ===== Data layer (localStorage acts as the demo database) ===== */
const DB_KEYS = { students: 'ppp_students', jobs: 'ppp_jobs', apps: 'ppp_applications' };

function getStudents(){ return JSON.parse(localStorage.getItem(DB_KEYS.students) || '[]'); }
function saveStudents(list){ localStorage.setItem(DB_KEYS.students, JSON.stringify(list)); }

function getJobs(){ return JSON.parse(localStorage.getItem(DB_KEYS.jobs) || '[]'); }
function saveJobs(list){ localStorage.setItem(DB_KEYS.jobs, JSON.stringify(list)); }

function getApplications(){ return JSON.parse(localStorage.getItem(DB_KEYS.apps) || '[]'); }
function saveApplications(list){ localStorage.setItem(DB_KEYS.apps, JSON.stringify(list)); }

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function today(){ return new Date().toISOString().split('T')[0]; }

/* ===== Seed demo data on first run ===== */
function initDemoData(){
  if(getJobs().length === 0){
    saveJobs([
      { id: uid(), title: 'Frontend Developer Intern', company: 'Tech Nova', type: 'Internship', location: 'Chennai', description: 'Work on React-based UI components for our client dashboard.' },
      { id: uid(), title: 'Data Analyst', company: 'InsightWorks', type: 'Job', location: 'Bangalore', description: 'Analyze business data and build reports using SQL and Python.' },
      { id: uid(), title: 'Backend Engineer Intern', company: 'CloudSpring', type: 'Internship', location: 'Remote', description: 'Build REST APIs using Node.js and MongoDB.' },
      { id: uid(), title: 'UI/UX Designer', company: 'Pixel Studio', type: 'Job', location: 'Chennai', description: 'Design user-friendly interfaces for web and mobile apps.' }
    ]);
  }
}

/* ===== Student auth ===== */
function registerStudent({name, email, phone, course, password}){
  const students = getStudents();
  if(students.find(s => s.email.toLowerCase() === email.toLowerCase())){
    return { ok: false, message: 'An account with this email already exists.' };
  }
  students.push({
    id: uid(), name, email, phone, course, password,
    resumeName: null, resumeData: null, regDate: today()
  });
  saveStudents(students);
  return { ok: true, message: 'Registration successful! You can now log in.' };
}

function loginStudent(email, password){
  const student = getStudents().find(s =>
    s.email.toLowerCase() === email.toLowerCase() && s.password === password);
  return student ? { ok: true, user: student } : { ok: false, message: 'Invalid email or password.' };
}

function updateStudent(id, updates){
  const students = getStudents();
  const idx = students.findIndex(s => s.id === id);
  if(idx > -1){ students[idx] = { ...students[idx], ...updates }; saveStudents(students); }
}

/* ===== Session handling ===== */
function setSession(studentId){ sessionStorage.setItem('ppp_session_student', studentId); }
function clearSession(){ sessionStorage.removeItem('ppp_session_student'); }
function requireStudentSession(){
  const id = sessionStorage.getItem('ppp_session_student');
  const student = getStudents().find(s => s.id === id);
  if(!student){ window.location.href = 'index.html'; return null; }
  return student;
}

/* ===== Admin auth (fixed demo credentials) ===== */
const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };
function loginAdmin(username, password){
  if(username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password){
    sessionStorage.setItem('ppp_session_admin', 'true');
    return true;
  }
  return false;
}
function clearAdminSession(){ sessionStorage.removeItem('ppp_session_admin'); }
function requireAdminSession(){
  if(sessionStorage.getItem('ppp_session_admin') !== 'true'){
    window.location.href = 'index.html';
  }
}

/* ===== Jobs (admin) ===== */
function addJob({title, company, type, location, description}){
  const jobs = getJobs();
  jobs.unshift({ id: uid(), title, company, type, location, description, postedDate: today() });
  saveJobs(jobs);
}
function deleteJob(id){
  saveJobs(getJobs().filter(j => j.id !== id));
  saveApplications(getApplications().filter(a => a.jobId !== id));
}

/* ===== Applications ===== */
function applyToJob(studentId, jobId){
  const apps = getApplications();
  if(apps.find(a => a.studentId === studentId && a.jobId === jobId)) return;
  apps.push({ id: uid(), studentId, jobId, status: 'Pending', appliedDate: today() });
  saveApplications(apps);
}
function updateApplicationStatus(appId, status){
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === appId);
  if(idx > -1){ apps[idx].status = status; saveApplications(apps); }
}
