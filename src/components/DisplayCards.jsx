import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DisplayCards(props) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{ float: "left", margin: "15px" }}
      key={props._id}
    >
      <CardMedia component="img" height="140" image={props.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy Now</Button>
        <Button size="small">Dummy</Button>
      </CardActions>
    </Card>
  );
}
