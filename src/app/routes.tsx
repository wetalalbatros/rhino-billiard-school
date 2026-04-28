import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

// import.meta.env.BASE_URL is set by Vite to match the `base` in vite.config.ts
// This makes routing work correctly both locally (/) and on GitHub Pages (/repo-name/)
export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: "blogs", Component: BlogList },
        { path: "blogs/:slug", Component: BlogPost },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
