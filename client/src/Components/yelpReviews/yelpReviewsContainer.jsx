import SingleItem from "./singleItem";
import style from "./yelpReviewsList.module.css";

export default function YelpReviewsContainer({ reviews }) {
  return (
    <div className={style.yelpReviewsContainer}>
      <h2>Recent Yelp Reviews</h2>
      <SingleItem reviews={reviews} />
    </div>
  );
}
