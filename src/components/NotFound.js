import { Link } from "react-router-dom";
function NotFound () {
  return (
    <>
      <div id="notFoundPage" className="bg-yellow">
        <div className="container vhContainer">
          <img className="not-found-img" src={require('../assets/404.png')} alt=""/>
          <div className="homeButton">
            <Link to="/">Back to home</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound;
