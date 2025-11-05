# News Explorer

A React-based web application that allows users to search for news articles, save their favorites, and manage their saved articles collection.

## Live Demo

**🔗 [View Live Project](https://pearlmat0527.github.io/stage-1-frontend-api)**

## Features

- **Search News Articles**: Search for news articles using keywords
- **User Authentication**: Sign up and log in to access personalized features
- **Save Articles**: Bookmark articles to your personal collection
- **Manage Saved Articles**: View and delete saved articles on a dedicated page
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface following modern design principles

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **React Router** - For client-side routing and navigation
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with BEM methodology
- **News API** - For fetching real-time news articles
- **LocalStorage** - For persisting user authentication state

## Project Structure

```
news-explorer-frontend/
├── src/
│   ├── components/
│   │   ├── App/
│   │   ├── Header/
│   │   ├── SearchForm/
│   │   ├── Main/
│   │   ├── Footer/
│   │   ├── SavedNews/
│   │   ├── LoginModal/
│   │   ├── RegisterModal/
│   │   └── ...
│   ├── utils/
│   │   ├── NewsApi.js
│   │   └── auth.js
│   ├── images/
│   └── vendor/
├── public/
└── package.json
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

```bash
   git clone https://github.com/pearlmat0527/stage-1-frontend-api.git
   cd stage-1-frontend-api
```

2. **Install dependencies**

```bash
   npm install
```

3. **Run the development server**

```bash
   npm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages

## Usage

1. **Search for Articles**: Enter a keyword in the search bar on the home page
2. **Sign Up/Login**: Click "Sign in" to create an account or log in
3. **Save Articles**: Click the bookmark icon on any article to save it (requires login)
4. **View Saved Articles**: Navigate to "Saved articles" to see your bookmarked content
5. **Delete Articles**: Click the trash icon to remove articles from your saved collection

## Design Specifications

- **Responsive Breakpoints**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1279px
  - Desktop: 1280px and above
- **Design System**: Based on Figma mockups
- **Methodology**: BEM (Block Element Modifier) naming convention

## API Integration

This project integrates with:

- **News API** - For fetching news articles based on search queries
- **Custom Backend API** - For user authentication and saved articles management

## Deployment

The project is deployed on GitHub Pages. 
## Future Enhancements

- [ ] Backend integration for persistent saved articles
- [ ] Article filtering and sorting options
- [ ] Share articles on social media
- [ ] Dark mode toggle
- [ ] More advanced search filters
- [ ] deploying in Google

## Author

**Pearly Mathew**

- GitHub: [@pearlmat0527](https://github.com/pearlmat0527)
- LinkedIn: [Add your LinkedIn URL]

## Acknowledgments

- Design specifications provided by TripleTen
- News data powered by News API
- Icons and images optimized for web performance

## License

This project is part of the TripleTen Software Engineering Bootcamp curriculum.

---

**Project Status**: Stage 1 - Frontend Development Complete ✅
