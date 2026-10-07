import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Root from "./pages/Root"
import Quest from "./pages/Quest"
import Main from "./pages/Main"
import Faq from "./pages/Faq"
import About from "./pages/About"
import Phase1 from "./pages/Quest/components/Phase1"
import Phase2 from "./pages/Quest/components/Phase2"
// import Phase3 from "./pages/Quest/components/Phase3"
import Phase3 from "./pages/Quest/components/Phase3/NewPhase3"
import Inventory from "./pages/Quest/components/Inventory"
import Notes from "./pages/Notes"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/main", element: <Main /> },
      {
        path: "/quest",
        element: <Quest />,
        children: [
          { path: "/quest/phase-1", element: <Phase1 /> },
          { path: "/quest/phase-2", element: <Phase2 /> },
          { path: "/quest/phase-3", element: <Phase3 /> },
          { path: "/quest/inventory", element: <Inventory /> },
        ],
      },
      { path: "/faq", element: <Faq /> },
      { path: "/about", element: <About /> },
      { path: "/notes/:chapter/:episode", element: <Notes />}
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
