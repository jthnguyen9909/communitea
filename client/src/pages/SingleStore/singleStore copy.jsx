import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import FooterComponent from "../../Components/footer/footer";
import HeaderComponent from "../../Components/header";
import RecentReviewsContainer from "../../Components/recentReviews/recentReviewsContainer";
import { StarOutlined } from "@ant-design/icons";
import style from "./singleStore.module.css";
import { useQuery, useMutation } from "@apollo/client";

import { GET_STORE, QUERY_ME } from "../../utils/queries";
import { ADD_STORE, FAV_STORE, ADD_REVIEW } from "../../utils/mutations";
import { Button } from "antd";

export default function SingleStore() {
  const storeId = useParams();
  // console.log(storeId);

  const location = useLocation();
  const path = location.pathname.split("/");
  const storeID = path[path.length - 1];

  // this is the query used to retrieve a store from db if needed

  const [reviews, setReviews] = useState({});
  const [storeData, setStoreData] = useState({});
  const [dbData, setDbData] = useState({});

  // const { loading: loading1, data: data1 } = useQuery(GET_STORE, {
  //   variables: { ...storeId },
  // });

  // const [loading: loading2, data: data2] = useQuery(QUERY_ME);
  // const userData = data2?.me || {};
  // console.log("user data", userData);

  const QueryMultiple = () => {
    const storeRes = useQuery(GET_STORE, { variables: { ...storeId } });
    const userRes = useQuery(QUERY_ME);
  };

  const [
    { loading: loading1, data: data1 },
    { loading: loading2, data: data2 },
  ] = QueryMultiple();

  console.log(QueryMultiple());

  // useEffect(() => {
  //   fetchYelpReviews();
  //   fetchStoreDetails();
  //   document.title = `CommuniTEA - ${storeData?.name}`;
  // }, []);

  // without the dependency array, document title rerenders after storedata loads
  useEffect(() => {
    // console.log(data);
    if (loading1 === false) {
      if (data1) {
        // console.log(data);
        setStoreData(data1.getStore);
      } else {
        fetchYelpReviews();
        fetchStoreDetails();
      }
    }
    document.title = `CommuniTEA - ${storeData?.name}`;
  }, [loading1, data1]);

  // useEffect(() => {
  //   if (!storeData) {
  //     fetchYelpReviews();
  //     fetchStoreDetails();
  //   }
  //   document.title = `CommuniTEA - ${storeData?.name}`;
  // }, []);

  const expressAPI = "https://tranquil-plains-63846.herokuapp.com/api/yelp";

  const [favStore, { error: favError }] = useMutation(FAV_STORE);
  const [addStore, { error: addError }] = useMutation(ADD_STORE);

  const favoriteStore = async (e) => {
    e.preventDefault();

    try {
      const { data: storeSaved } = await addStore({
        variables: { storeData: { ...dbData } },
      });
      // console.log(storeSaved.addStore._id);
      const { data: favData } = await favStore({
        variables: { store_id: storeSaved.addStore._id },
      });
      // console.log(favData);
    } catch (err) {
      console.error(err);
    }
  };

  const [addReview, { error: reviewError }] = useMutation(ADD_REVIEW);

  const [formState, setFormState] = useState({
    content: "",
    score: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("userdata", userData);
    // console.log("formstate", formState);
    const reviewForm = {
      content: formState.content,
      score: formState.score,
      store_id: storeData.id,
      storeName: storeData.name,
      storeURL: storeData.url,
      username: "pagetest",
      full_name: "temp user",
    };
    // console.log("reviewForm", reviewForm);

    try {
      const { data: reviewData } = await addReview({
        variables: { reviewEntry: { ...reviewForm } },
      });
      // console.log("reviewdata", reviewData);
    } catch (err) {
      console.error(err);
    }
  };

  // functions to fetch yelp reviews and single store information
  async function fetchYelpReviews() {
    const endpoint = `/reviews/${storeID}`;
    const api = expressAPI + endpoint;
    await fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((reviews) => setReviews(reviews));
  }
  const fetchStoreDetails = async () => {
    const endpoint = `/store/${storeID}`;
    const api = expressAPI + endpoint;
    await fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((storeData) => {
        const storeAddress = `${storeData.location.address1} ${storeData.location.address2}, ${storeData.location.city}, ${storeData.location.state} ${storeData.location.zip_code}`;
        const storeCategories = storeData.categories.map(
          (category) => category.title
        );
        const storeInput = {
          storeId: storeData.id,
          name: storeData.name,
          price: storeData.price,
          phone: storeData.phone,
          address: storeAddress,
          categories: storeCategories,
          yelpURL: storeData.url,
          image: storeData.image_url,
          photos: storeData.photos,
        };
        setStoreData(storeData);
        setDbData(storeInput);
      });
  };

  // if (loading) {
  //   ;<h2>Loading...</h2>
  // }

  // console.log(storeData.name);
  return (
    <>
      {storeData && (
        <>
          <div className={style.navContainer}>
            <HeaderComponent />
          </div>
          <main className={style.main}>
            <div className={style.contentWrapper}>
              <header className={style.header}>
                <h1>
                  <a href={storeData.url || storeData.yelpURL} target="_blank">
                    {storeData.name}
                  </a>
                </h1>
              </header>
              <section>
                <div className={style.photoContainer}>
                  {storeData?.photos?.map((photo, key) => (
                    <img key={key} src={photo} className={style.image} />
                  ))}
                </div>
              </section>
              <div className={style.descriptionWrapper}>
                <section className={style.storeDescription}>
                  <div>
                    <article>
                      <div className={style.categoryContainer}>
                        {storeData?.categories?.map((category, key) => (
                          <p key={key}>{category.alias || category}</p>
                        ))}
                      </div>
                      <p id="rating" className={style.rating}>
                        {storeData?.rating || storeData.avg_rating}{" "}
                        <StarOutlined />
                      </p>
                      {storeData?.address ? (
                        <p>{storeData.address}</p>
                      ) : (
                        <>
                          <p>{storeData?.location?.address1}</p>
                          <p>
                            {storeData?.location?.city},{" "}
                            {storeData?.location?.state}{" "}
                            {storeData?.location?.zip_code}
                          </p>
                        </>
                      )}
                      <p>price: {storeData?.price}</p>
                      <p>{storeData?.display_phone}</p>
                      <button
                        className={style.addToFavBtn}
                        onClick={favoriteStore}
                      >
                        Add to favorites
                      </button>
                    </article>
                  </div>
                </section>
                <section className={style.reviewsContainer}>
                  {storeData && (
                    <RecentReviewsContainer
                      reviews={reviews}
                      storeData={storeData}
                    />
                  )}
                </section>
              </div>
              <article className={style.reviewFormArticle}>
                {/* <ReviewForm
                  storeName={storeData?.name}
                  storeId={storeData?.id}
                  storeURL={storeData?.url}
                /> */}
              </article>
            </div>
            <div className={style.container}>
              <div className={style.form}>
                <form onSubmit={handleFormSubmit}>
                  <div className={style.input}>
                    <label htmlFor="content">Content</label>
                    <input
                      type="text"
                      name="content"
                      id="content"
                      value={formState.content}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={style.input}>
                    <label htmlFor="score">Score</label>
                    <input
                      type="number"
                      name="score"
                      id="score"
                      value={formState.score}
                      onChange={handleChange}
                    />
                  </div>
                  <Button htmlType="submit">Submit</Button>
                </form>
              </div>
            </div>
          </main>
          <FooterComponent />
        </>
      )}
    </>
  );
}