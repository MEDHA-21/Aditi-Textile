# Aditi Textile - E-Commerce Web Application

A modern, full-featured e-commerce platform for textile products built with React and Firebase.

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products by categories (Women, Men, Kids, Others)
- **Product Details**: Detailed product pages with image carousel, specifications, and features
- **Wishlist**: Save favorite products for later
- **Shopping Cart**: Add products to cart with size and quantity selection
- **User Authentication**: Google Sign-In integration via Firebase
- **Responsive Design**: Mobile-friendly interface with bottom navigation
- **Search & Filter**: Find products easily

### Shopkeeper Dashboard
- **Product Management**: Add, edit, and delete products
- **Stock Management**: Track and update inventory
- **Order Management**: View and manage customer orders
- **Secure Access**: Protected routes with authentication

## 🚀 Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Database**: Firebase Firestore (ready for integration)
- **Storage**: Firebase Storage (for product images)
- **State Management**: React Context API
- **Icons**: React Icons
- **Styling**: CSS3 with responsive design

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/MEDHA-21/Aditi-Textile.git
cd aditi-textile
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Copy your Firebase configuration
   - Update `src/firebase/config.js` with your credentials

4. Start the development server:
```bash
npm start
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Creates an optimized production build in the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## 🔐 Authentication

Currently supports:
- ✅ Google Sign-In
- 🔄 Email/Password (coming soon)

User data is stored in localStorage for authenticated users, with Firestore integration ready for future deployment.

## 🎨 Key Features Breakdown

### Product Details Page
- Multi-image carousel with thumbnails
- Size selection (S, M, L, XL, XXL)
- Quantity controls
- Add to cart/wishlist
- Product specifications table
- Care instructions
- Feature highlights
- Star ratings and reviews

### Wishlist & Cart
- Persistent storage across sessions
- User-specific data (authenticated users)
- Guest support via localStorage
- Easy product management

### Shopkeeper Dashboard
- Secure login credentials:
  - Username: `rakhi_aditi` / Password: `aditi@2025`
  - Username: `worker_aditi` / Password: `worker@2025`
- Complete product CRUD operations
- Stock tracking
- Order management

## 🚀 Deployment

For production deployment:
```bash
npm run build
netlify deploy --prod
```

## 🔮 Future Enhancements

- [ ] Email/Password authentication
- [ ] Firestore database integration
- [ ] Payment gateway integration
- [ ] Order tracking system
- [ ] Customer reviews and ratings
- [ ] Product search with filters
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Discount/coupon system
- [ ] Multiple payment methods

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with ❤️ by MEDHA-21

---

**Note**: Firebase configuration credentials are required for authentication features to work. See `FIREBASE_SETUP.md` for detailed setup instructions.
