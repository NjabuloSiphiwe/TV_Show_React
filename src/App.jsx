import { useEffect, useState } from "react";
import { TVShowsAPI } from "./api/tv.show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVshow, setCurrentTVshow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const popularTVshowsList = await TVShowsAPI.fectchPopulars();
        if (popularTVshowsList.length > 0)
          setCurrentTVshow(popularTVshowsList[0]);
      } catch (error) {
        console.error();
      }
    })();
  }, []);

  useEffect(() => {
    if (currentTVshow) {
      (async () => {
        //console.log(currentTVshow.id);
        try {
          const recommendationListResp = await TVShowsAPI.fetchRecommendations(
            currentTVshow.id
          );
          if (recommendationListResp.length > 0)
            setRecommendationList(recommendationListResp.slice(0, 10));
        } catch (error) {
          console.error();
        }
      })();
    }
  }, [currentTVshow]);

  function updateCurrentTVShow(tvShow) {
    setCurrentTVshow(tvShow);
  }
  async function fetchByTitle(title) {
    try {
      const searchResponse = await TVShowsAPI.fetchByTitle(title);
      if (searchResponse.length > 0) setCurrentTVshow(searchResponse[0]);
    } catch (error) {
      console.error();
    }
  }
  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVshow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVshow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              img={logoImg}
              title={"Watowatch"}
              subtitle={"Find a show you may like"}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVshow && <TVShowDetail tvShow={currentTVshow} />}
      </div>
      <div className={s.recommended_tv_shows}>
        {currentTVshow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
