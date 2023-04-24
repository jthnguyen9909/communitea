import EmptyCard from "../skeleton/emptyCard";
import { Carousel } from "antd";
import { StarOutlined } from "@ant-design/icons";
import style from "./reviewsList.module.css";
import formatDate from "../../utils/formatDate";

export default function SingleReview({ reviews }) {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className={style.singleItemContainer}>
      <Carousel afterChange={onChange}>
        {reviews ? (
          reviews &&
          reviews.map &&
          reviews.map((item, key) => (
            <div key={key} style={contentStyle}>
              <article className={style.listItemContainer}>
                <p className={style.rating}>
                  {item.score} <StarOutlined />
                </p>
                <div className={style.containerRow}>
                  <h3>"{item.content}"</h3>
                </div>
                <p>
                  - {item.username} {item.createdAt}
                </p>
              </article>
            </div>
          ))
        ) : (
          <EmptyCard />
        )}
      </Carousel>
    </div>
  );
}

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
