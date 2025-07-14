# 📧 AI Email Reply Generator

A full-stack project that auto-generates replies to emails using AI. Built with **React** frontend and **Spring Boot** backend powered by **Gemini AI API**.

---

## ✨ Features

- 🎤 Voice Input for emails
- 🎯 Tone customization (Professional, Casual, Friendly)
- ⚡ Real-time AI-generated responses
- 🧠 Language auto-detection and translation (optional)
- 📋 Copy to clipboard support
- 🔐 Gemini API key securely managed

---

## 🛠️ Tech Stack

| Frontend | Backend      | AI         |
|----------|--------------|------------|
| React    | Spring Boot  | Gemini API |

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js & npm
- Java 17+
- Maven
- Gemini API Key

---

### 🖥️ Frontend Setup (React)

```bash
cd email-writer-ext
npm install
npm run dev



cd email-writer-sb
./mvnw spring-boot:run


Make sure you set your application.properties like this:

properties
Copy
Edit
spring.application.name=email-writer-sb
gemini.api.url=URL
gemini.api.key=${GEMINI_KEY}

<img width="1135" height="904" alt="image" src="https://github.com/user-attachments/assets/9d711153-63ee-4c31-b281-357b1a8f2fe7" />

