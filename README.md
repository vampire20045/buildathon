# 🚀 AI-Powered Hiring Platform for HR & Students

A full-stack intelligent platform that transforms the hiring process. Students take a **25-minute AI-evaluated test** across three sections, and **HR professionals** can identify top candidates effortlessly through performance-based filtering powered by **Gemini AI**.

---

## 🎯 Purpose

- 🧑‍💼 **For HR**: Streamlined access to high-potential candidates
- 🎓 **For Students**: Showcase abilities through a standardized AI-evaluated test
- 🤖 **AI Integration**: Gemini provides accurate, section-wise scoring and hiring recommendations

---

## 🧠 Key Features

- ⏱️ **25-Minute Test**, auto-submits at end
- 📚 **3 Sections** with 8 randomly selected questions from a pool of 100 each
- 🔄 **Randomization** ensures a unique test experience
- 💾 **Test data is saved** with timestamp, answers, and scores
- 🤖 **Gemini AI evaluation** returns scores and hiring suggestions
- 👤 **Student and HR logins** with role-based dashboards
- 📈 **HR Dashboard** shows ranked student results
- 🛡️ **Optional anti-cheating** measures (camera, location, fullscreen mode)

---

## 🧱 Tech Stack

| Layer         | Technology Used                  |
|---------------|----------------------------------|
| **Frontend**  | React (Vite), Tailwind CSS       |
| **Backend**   | Node.js, Express, TypeScript     |
| **Database**  | PostgreSQL with Prisma ORM       |
| **AI Engine** | Google Gemini API                |
| **Auth**      | JWT (JSON Web Tokens)            |
| **Hosting**   | Frontend on Vercel, Backend on AWS |

---

## 📊 Functional Workflow

1. Student registers and logs in.
2. Takes a **timed 25-minute test** (8 random questions per section).
3. Submissions stored securely in PostgreSQL via Prisma.
4. Gemini API evaluates the answers and returns:
   - Score per section
   - Total score
   - AI-generated hiring recommendation
5. HR views results and filters by performance.

---

## 🧠 Gemini AI Prompt Example

```txt
Evaluate this student's performance:

Section: Technical
Q1: Explain the concept of closures in JavaScript.
Student Answer: A closure is...
Correct Answer: A closure is...

...

Return a score out of 8 for this section and provide a brief comment on their technical proficiency.
