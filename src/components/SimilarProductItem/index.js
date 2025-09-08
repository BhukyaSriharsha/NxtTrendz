import './index.css'

const SimilarProductItem = props => {
  const {eachProduct} = props
  const {imageUrl, title, price, brand, rating} = eachProduct

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-img"
      />
      <p className="title">{title}</p>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="product-rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
