import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BPOListItem from "../BPOListItem";
import Loading from "../../../commonComponents/Loading";
import "./BPOListOfListing.scss";

function BPOListOfListing({ loading, data, reloadData }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setResult(data);
    }
  }, [data]);

  return (
    <div className="content-listing">
      {loading ? (
        <Loading />
      ) : (
        result.map((item) => {
          return <BPOListItem key={item.rListingId} listing={item} />;
        })
      )}

      {!loading && data?.length === 0 && (
        <div className="p-l-xs">Không có listing nào được hiển thị.</div>
      )}
    </div>
  );
}

BPOListOfListing.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  reloadData: PropTypes.func,
};

BPOListOfListing.defaultProps = {
  data: [],
  loading: true,
  reloadData: null,
};

export default BPOListOfListing;
