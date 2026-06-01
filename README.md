# CineScope

## 1. Title
CineScope is a movie discovery app that lets users search movies, actors, and anime in one place, then save favorites and open detailed pages after signing in.

<!-- ## 2. Screenshot / GIF
Not available. -->

## 3. Live Demo
- https://cine-scoope.netlify.app/

## 4. Problem Statement
Finding entertainment options across different platforms can be fragmented and slow. CineScope brings movie, actor, and anime discovery into a single interface with user accounts and favorites.

## 5. Features
- Search across movies, actors, and anime
- Filter search by `All`, `Content`, `Actors`, or `Anime`
- Protected pages for profile, favorites, and detail views
- User registration and login with local persistence
- Add and remove favorites
- Smooth section navigation and loading states
- Toast notifications for search and favorite actions
- Responsive UI

## 6. Tech Stack
- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- React Toastify
- react-icons

## 7. Architecture
- `App.jsx` defines the router and protected routes
- `AppLayout.jsx` provides the shared navigation shell
- `CineScopeSearch.jsx` handles search, result rendering, and favorites
- `featureSlice.js` manages users, session state, notes, and favorites in Redux + localStorage
- API data is fetched from external public endpoints for TV and anime content

## 8. Folder Structure
```txt
src/
├─ assets/
├─ components/
│  ├─ AppLayout.jsx
│  ├─ AuthPopup.jsx
│  ├─ CineScopeSearch.jsx
│  ├─ MovieDetails.jsx
│  ├─ Profile.jsx
│  └─ ...
├─ redux/
│  ├─ featureSlice.js
│  └─ store.js
├─ App.jsx
├─ App.css
├─ index.css
└─ main.jsx
public/
dist/
```

## 9. Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build:
   ```bash
   npm run preview
   ```

## 10. Environment Variables
No environment variables are required at the moment.

## 11. API Routes
The app uses public APIs directly in the client:
- `https://api.tvmaze.com/search/shows?q={query}`
- `https://api.tvmaze.com/search/people?q={query}`
- `https://api.tvmaze.com/shows/{id}`
- `https://api.jikan.moe/v4/anime?q={query}`

## 12. Challenges Faced
- Keeping search results, protected routes, and user session state aligned
- Supporting multiple content types in one search experience
- Persisting favorites and users cleanly in localStorage
- Handling empty results and auth prompts without breaking the flow

## 13. Future Improvements
- Add backend authentication instead of localStorage-based auth
- Add pagination or infinite scroll for larger result sets
- Improve error handling and API fallback states
- Add dedicated loading skeletons for every detail page
- Expand favorites with sorting and categories
