import { Route, Routes } from "react-router-dom";

import { Home, Profile, NotFound } from "./pages";
import PrivateRoutes from "./utils/private-routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
