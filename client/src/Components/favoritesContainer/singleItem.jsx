import { Link } from "react-router-dom";
import style from "./favoritesList.module.css";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";

export default function SingleItem({ storeList }) {
  console.log("storelist", storeList);

  return (
    <div>
      <div className={style.favoritesListContainer}>
        {storeList &&
          storeList?.map((store) => (
            <div key={store.storeId}>
              {/* <Link to={`/store/${store.storeId}`}>
                <article className={style.listItemContainer}>
                  <img
                    src={store.image}
                    alt={store.name}
                    className={style.image}
                  />
                  <div className={style.containerRow}>
                    <h3>{store.name}</h3>
                    <p className={style.rating}>
                      {store.avg_rating} <StarOutlined />
                    </p>
                  </div>
                  <p>{store.address}</p>
                </article>
              </Link> */}

              <Card
                className={style.singleStoreContainer}
                sx={{
                  maxWidth: 345,
                  borderRadius: "6px",
                }}
              >
                <Link to={`/store/${store.storeId}`}>
                  <CardHeader
                    className={style.cardHeader}
                    sx={{ textAlign: "center" }}
                    title={store.name}
                  />
                </Link>
                <CardMedia
                  component="img"
                  height="194"
                  image={store.image}
                  alt={store.name}
                />
                <CardContent sx={{ mb: "0", pb: "0" }}>
                  {store.avg_rating ? (
                    <Typography
                      sx={{ textAlign: "center" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {store.name} &nbsp;
                      {store.price} &nbsp;
                      {store.avg_rating}
                      <StarIcon fontSize="inherit" />
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ textAlign: "center" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {store.name} &nbsp;
                      {store.price}
                    </Typography>
                  )}
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {store.address}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {store.phone}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Link to={`/store/${store.storeId}`}>
                    <IconButton aria-label="link">
                      <LaunchIcon />
                    </IconButton>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

// const contentStyle = {
//   margin: 0,
//   height: '160px',
//   color: 'red',
//   lineHeight: '160px',
//   textAlign: 'center',
// }
// const itemArray = [
//   { name: 'Boba House', rating: 5.0, description: 'business description' },
//   { name: 'ShareTea', rating: 3.5, description: 'business description' },
//   { name: 'Boba Place', rating: 4.0, description: 'business description' },
//   { name: 'Milk Tea', rating: 4.6, description: 'business description' },
// ]
