import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

import FooterComponent from "../../Components/footer/footer";
import HeaderComponent from "../../Components/header";
import FavoritesContainer from "../../Components/favoritesContainer/favoritesListContainer";

export default function Favorites() {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  return (
    <>
      <div>
        <HeaderComponent />
      </div>
      <FavoritesContainer favStores={userData.savedStores} />
      <FooterComponent />
    </>
  );
}
