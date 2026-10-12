# Avya — Fashion E-Commerce Frontend

Avya is a fashion e-commerce web application built with React.js. The frontend provides a user-friendly shopping experience with separate buyer and seller authentication flows and integration with a REST API backend.

**Live Demo:** https://avya-tau.vercel.app

## Features

* Responsive and reusable React UI components.
* Buyer and seller login flows.
* OTP-based email verification.
* REST API integration with the backend.
* Authentication and access control.
* Form handling and error management.
* Production deployment using Vercel.

## Tech Stack

* React.js
* JavaScript
* Vite
* CSS
* REST APIs
* Git and GitHub
* Vercel

## Installation and Setup

### Prerequisites

* Node.js
* npm
* Git

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://avya-backend-nomq.onrender.com
```

Ensure your frontend code uses this variable for API requests. If your code uses a different variable name, retain the existing name.

### 4. Run the application

```bash
npm run dev
```

The development server will display its local URL in the terminal.

### 5. Build for production

```bash
npm run build
```

## Backend Integration

The frontend communicates with the Avya backend through REST APIs for authentication and related application workflows.

## Deployment

The frontend is deployed on Vercel.

1. Connect the repository to Vercel.
2. Configure the required environment variables.
3. Deploy the application.
4. Verify authentication and API connectivity.

## Future Enhancements

* Product search and filtering.
* Shopping cart and wishlist.
* Order tracking and checkout.
* Payment gateway integration.
* Improved accessibility and performance.

## Author

**Sweta Mishra**

GitHub: https://github.com/swetasm108-bit

