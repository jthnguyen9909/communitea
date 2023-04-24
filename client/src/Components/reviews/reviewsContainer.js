import SingleReview from "./singleReview";
import style from "./reviewsList.module.css";

export default function ReviewsContainer({ reviews }) {
  return (
    <div className={style.reviewsContainer}>
      <h2>Recent CommuniTEA Reviews</h2>
      <SingleReview reviews={reviews} />
    </div>
  );
}
