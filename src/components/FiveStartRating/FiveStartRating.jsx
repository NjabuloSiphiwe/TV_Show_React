import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  // Declare star icon  array
  const starList = [];
  //Store number of filled stars
  const StarFillCount = Math.floor(rating);
  // Store if yes or no there is a half star
  const hasHalfStart = rating - parseInt(rating) >= 0.5;
  // Store the number of empty stars
  const emptyStarCount = 5 - StarFillCount - (hasHalfStart ? 1 : 0);
  // Push the filled star icons
  for (let i = 1; i <= StarFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }
  //Push an half star icon if necessary
  if (hasHalfStart) {
    starList.push(<StarHalf key={"star-half"} />);
  }
  // push the empty star icons
  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }
  // Render the star icon array

  return (
    //store
    <div>{starList}</div>
  );
}
