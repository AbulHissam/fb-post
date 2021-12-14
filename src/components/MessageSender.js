import React, { useEffect, useRef, useState } from "react";
import "./MessageSender.css";
import CloseIcon from "@mui/icons-material/Close";
import GifBoxIcon from "@mui/icons-material/GifBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePosts } from "../redux/postSlice";
import User from "./User";

function MessageSender() {
  const trending_gifs_url = "https://api.giphy.com/v1/gifs/trending";
  const search_gifs_url = "https://api.giphy.com/v1/gifs/search";
  const api_key = "u28wvu4xp0sFtSBgaxHfVJhI6D0ZBzij";

  const dispatch = useDispatch();

  const messageSenderRef = useRef();
  const contentRef = useRef();
  const gifRef = useRef();
  const menuRef = useRef();
  const inputGifCloseButtonRef = useRef();

  const [post, setPost] = useState({});
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");
  const [gifButtonClicked, setGifButtonClicked] = useState(true);

  const handleGifButtonClick = () => {
    if (gifButtonClicked) {
      menuRef.current.style.display = "block";
    } else {
      menuRef.current.style.display = "none";
    }
    setGifButtonClicked(!gifButtonClicked);
  };

  const handleGifSelection = (e) => {
    setSelectedGif(e.target.src);
    menuRef.current.style.display = "none";
    inputGifCloseButtonRef.current.style.display = "flex";
    setGifButtonClicked(!gifButtonClicked);
  };

  const handleGifSearchOnChange = (e) => {
    e.preventDefault();
    let query = e.target.value;

    const fetchGif = async () => {
      try {
        const response = await axios(search_gifs_url, {
          params: {
            api_key: api_key,
            q: query,
            limit: 10,
          },
        });
        const gifs = response.data.data;
        setTrendingGifs([...gifs]);
      } catch (err) {
        console.log(err);
      }
    };
    if (query) {
      fetchGif();
    } else {
      fetchTrendingGifs();
    }
  };

  const handleInputGifClose = () => {
    setSelectedGif("");
    contentRef.current.textContent = "";
    inputGifCloseButtonRef.current.style.display = "none";
  };

  const handlePost = () => {
    let postMessage = contentRef.current.textContent;
    let gif = selectedGif;

    if (postMessage || gif) {
      setPost({
        ...post,
        postMessage: postMessage,
        gif: gif,
      });

      setSelectedGif("");
      contentRef.current.textContent = "";
      inputGifCloseButtonRef.current.style.display = "none";
    } else {
      alert("Plese Enter a message or select a gif");
    }
  };

  const fetchTrendingGifs = async () => {
    try {
      const response = await axios(trending_gifs_url, {
        params: {
          api_key: api_key,
          limit: 20,
        },
      });
      const gifs = response.data.data;
      setTrendingGifs([...gifs]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  useEffect(() => {
    dispatch(updatePosts(post));
  }, [post]);

  return (
    <div className="messageSender" ref={messageSenderRef}>
      <div className="messageSender__heading">
        <h5>Create Post</h5>
      </div>

      <div className="messageSender__content">
        <User />
        <div className="messageSender__input">
          <div
            ref={contentRef}
            className="content"
            contentEditable={true}
            data-placeholder="What's on your mind, User?"
          ></div>
          <div className="input__gifContainer">
            <button
              ref={inputGifCloseButtonRef}
              className="input__gifContainerCloseButton"
              onClick={handleInputGifClose}
            >
              <CloseIcon />
            </button>
            {selectedGif && (
              <img src={selectedGif} ref={gifRef} alt="Selected Gif" />
            )}
          </div>
        </div>
      </div>

      <div className="messageSender_bottom">
        <div className="messageSender__gifDropdown">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleGifButtonClick}
          >
            <GifBoxIcon />
            GIF
            <KeyboardArrowDownIcon />
          </button>
          <div className="menu" ref={menuRef}>
            <form onChange={handleGifSearchOnChange}>
              <input
                type="text"
                className="gif__Search"
                placeholder="Search Gif's"
              />
            </form>
            {trendingGifs.length !== 0 &&
              trendingGifs.map((trendingGif) => {
                return (
                  <img
                    className="item"
                    key={`${trendingGif.id}`}
                    src={`${trendingGif.images.fixed_height.url}`}
                    onClick={handleGifSelection}
                    alt={`${trendingGif.title}`}
                  />
                );
              })}
          </div>
        </div>

        {/* POST BUTTON */}
        <button
          type="submit"
          className="btn messageSender_submit"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
export default MessageSender;
