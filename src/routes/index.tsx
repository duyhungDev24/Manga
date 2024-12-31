import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "../components/layouts/clients/LayoutClient";
import HomePages from "../components/layouts/clients/pages/HomePages";
import MangaDetail from "../components/layouts/clients/pages/MangaDetail";

type Props = {};

const Router = (props: Props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePages />} />
          <Route path="/home" element={<HomePages />} />
          <Route path="/detail/:slug" element={<MangaDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
