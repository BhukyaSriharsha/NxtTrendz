import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    product: {},
    count: 1,
    isLoading: true,
    isError: false,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  decreaseCount = () => {
    this.setState(prevState => ({
      count: prevState.count > 1 ? prevState.count - 1 : 1,
    }))
  }

  increaseCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  getProductItemDetails = async () => {
    this.setState({isLoading: true, isError: false})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const updatedData = {
          id: data.id,
          imageUrl: data.image_url,
          title: data.title,
          price: data.price,
          rating: data.rating,
          totalReviews: data.total_reviews,
          description: data.description,
          similarProducts: data.similar_products.map(product => ({
            id: product.id,
            imageUrl: product.image_url,
            title: product.title,
            brand: product.brand,
            price: product.price,
            rating: product.rating,
          })),
          availability: data.availability,
          brand: data.brand,
        }

        this.setState({
          product: updatedData,
          isLoading: false,
          isError: false,
        })
      } else {
        this.setState({isLoading: false, isError: true})
      }
    } catch (err) {
      this.setState({isLoading: false, isError: true})
    }
  }

  renderFailureView = () => {
    const {history} = this.props
    return (
      <div className="error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="error-img"
        />
        <h1 className="error-head">Product Not Found</h1>
        <button
          type="button"
          className="continue-btn"
          onClick={() => history.replace('/products')}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  render() {
    const {product, count, isLoading, isError} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      similarProducts,
    } = product

    if (isLoading) {
      return (
        <div data-testid="loader" className="loader-container">
          <p>Loading...</p>
        </div>
      )
    }

    if (isError) {
      return this.renderFailureView()
    }

    return (
      <>
        <Header />
        <div className="product-item-container">
          <div className="show-product-container">
            <img src={imageUrl} alt="product" className="product-img" />
            <div className="product-detail">
              <h1 className="product-head">{title}</h1>
              <p className="price">Rs {price}/-</p>
              <div className="rating-review-container">
                <div className="product-rating-container">
                  <p className="rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star-img"
                  />
                </div>
                <p className="review">{totalReviews} Reviews</p>
              </div>
              <p className="description">{description}</p>
              <p className="product-status">{availability}</p>
              <p className="product-status">{brand}</p>
              <hr className="seperator" />
              <div className="product-count">
                <button
                  type="button"
                  className="count-btn"
                  onClick={this.decreaseCount}
                  data-testid="minus"
                >
                  <BsDashSquare className="count-change" />
                </button>
                <p className="count">{count}</p>
                <button
                  type="button"
                  className="count-btn"
                  onClick={this.increaseCount}
                  data-testid="plus"
                >
                  <BsPlusSquare className="count-change" />
                </button>
              </div>
              <button type="button" className="add-cart-btn">
                Add To Cart
              </button>
            </div>
          </div>
          <div className="similar-product-container">
            <h1 className="similar-product-head">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProducts &&
                similarProducts.map(eachProduct => (
                  <SimilarProductItem
                    key={eachProduct.id}
                    eachProduct={eachProduct}
                  />
                ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default ProductItemDetails
