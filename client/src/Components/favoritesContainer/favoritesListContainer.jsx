import EmptyCard from "../skeleton/emptyCard";
import SingleItem from "./singleItem";
import style from "./favoritesList.module.css";

export default function FavoritesContainer({ favStores }) {
  return (
    <>
      <div>
        <h2 className={style.favoriteHeader}>My Favorite Stores</h2>
      </div>
      <div>
        {favStores ? (
          <SingleItem storeList={favStores} />
        ) : (
          <EmptyCard item={"favorite stores"} />
        )}
      </div>
    </>
  );
}
