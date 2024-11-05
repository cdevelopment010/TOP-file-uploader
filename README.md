# File Uploader

This project is a simple file uploader that allows users to create accounts, organize files into folders, and upload files, all with user-specific privacy. Each user's folders and files are accessible only to them.

## Features

- **User Registration**: Users can create an account.
- **Folder Creation**: Organize files by creating folders.
- **File Uploading**: Upload files into folders.
- **Privacy**: Folders and files are visible only to the user who created them.

## Tech Stack

- **Express**: Server framework for handling routing and API logic.
- **npm**: Package manager for dependencies.
- **EJS**: Embedded JavaScript templates for server-side rendering.
- **Prisma**: ORM for database management.
- **bcryptjs**: For password hashing.
- **multer**: Middleware for handling file uploads.

## Getting Started

### Prerequisites

- Node.js (latest version recommended)
- npm (comes with Node.js)
- mysql (or other local database)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/cdevelopment010/TOP-file-uploader.git
   cd TOP-file-uploader
   ```

2. Install dependencies: 
   ```bash
   npm install
   ```

3. Set up environment variables: 
   ```bash
   DATABASE_URL: XXXXXXX
   ```
4. Migrate Prisma
   ```bash
    npx prisma migrate dev --name init
   ```
5. Run app locally: 
   ```bash
    node --watch app.js
   ```
    Or
    ```bash
    node app.js
    ```

## Usage
Once running, you can: 
- Register a new user.
- Create folders to organize files. 
- Upload files into specific folders. 
