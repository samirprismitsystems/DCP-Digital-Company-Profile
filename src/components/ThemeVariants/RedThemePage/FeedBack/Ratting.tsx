import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const Ratting = ({
  count,
  rating,
  color,
  onRating,
}: {
  count: number;
  rating: number;
  color: {
    unfilled: any;
    filled: any;
  };
  onRating: (value: any) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <span className="mx-1">
          <FontAwesomeIcon
            key={idx}
            className="cursor-pointer w-12 h-12"
            icon={faStar}
            onClick={() => onRating(idx)}
            style={{ color: getColor(idx) }}
            onMouseEnter={() => setHoverRating(idx)}
            onMouseLeave={() => setHoverRating(0)}
          />
        </span>
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

Ratting.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

Ratting.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#ff9e00",
    unfilled: "#DCDCDC",
  },
};

export default Ratting;
