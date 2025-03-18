# 📝 OCR Service (Image to Text Extractor)

[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/your-repo/ocr-service)

A **microservice-based OCR** tool that extracts **text from images** using **AWS Textract**. Built with **NestJS**, this service provides a secure **REST API** with **API key authentication**.

## 🚀 Features

✅ Extract text from images using **AWS Textract**  
✅ Secure **REST API** with **API Key authentication**  
✅ **Scalable microservice** architecture  
✅ Easy deployment with **Docker** or **Cloud services**

## ⚙️ Tech Stack

- **NestJS** - Backend framework 🏗️
- **AWS Textract** - OCR processing ☁️
- **REST API** - API architecture 🌍
- **API Key Authentication** - Secure access 🔑

## 🛠 Installation & Setup

### 📌 Prerequisites

- **Node.js** installed
- **AWS account** with Textract access

### 🔧 Steps to Run

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/ocr-service.git
   cd ocr-service
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and configure the following:

   ```env
   RESPONSE_URL=
   SECRET_KEY=
   EXPIRES_IN=
   AWS_REGION=
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   OCR_API_KEY=
   ```

4. Start the service:
   ```sh
   npm run start
   ```

## 🔥 API Docs

### local doc

```
http://localhost:8000/
```

### 1️⃣ Extract Text from Image

📌 **Endpoint:** `POST api/v1/ocr/scan`

📌 **Headers:**

```json
{
  "x-api-key": "your_api_key"
}
```

📌 **Body (multipart/form-data):**

```json
{
  "passport": "(Upload image file)"
}
```

📌 **Response:**

```json
{
  "text": "Extracted text from image"
}
```

## 🔐 Security

🔹 Uses **API key authentication** for secure access.  
🔹 Store API keys **securely** and never expose them in public repositories.

## 🚀 Deployment

This service can be deployed using **Docker**, **AWS Lambda**, or any **cloud platform** supporting **NestJS**.

## 👨‍💻 Author

Developed by **Terry Minn**  
📩 Contact: [shinnthantmindev.mm@gmail.com]
