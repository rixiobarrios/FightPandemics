import React, { useContext } from "react";
import { WhiteSpace } from "antd-mobile";
import { FeedContext } from "pages/Feed.js";

import AddressInput from "components/Input/AddressInput";
// ICONS
import SvgIcon from "components/Icon/SvgIcon"
import navigation from "assets/icons/navigation.svg";

const LocationSearch = () => {
  const feedContext = useContext(FeedContext);
  const { location, handleLocation } = feedContext;
  return (
    <div className="location-search">
      <AddressInput location={location} onLocationChange={handleLocation}/>
      <WhiteSpace size="lg" />
      <WhiteSpace />
      <div className="svgicon-share-mylocation-size">
        <SvgIcon src={navigation} style={{ marginRight: "1rem" }} />
        Share My Location
      </div>
      <WhiteSpace />
    </div>
  );
};

export default LocationSearch;
