import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function SocialMediaEmbed({politician}) {
  //Our dynamic data that our embed elements require
  const youtubeVidSrc = `https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=user_uploads&list=${politician.youtube}`;
  const facebookSRC = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${politician.facebook}&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`;
  console.log(facebookSRC)
  return (
    <>
      <div
        className="card mt-3 mb-3 p-3"
        style={{
          width: "50vw",
          zIndex: "2",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <h2 style={{ fontFamily: "Times New Roman"}}>Recent Activity</h2>
      </div>
      <div className="row">
        <div
          className="col-12 col-lg-6 mt-3 mb-3"
          style={{ textAlign: "center", margin: "auto",  fontFamily: "Times New Roman",borderRadius:"2px" }}
        >
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={politician.twitter}
            options={{ height: 1200 }}
            className="mb-3"
          />
        </div>
        <div
          className="col-12 col-md-6 mt-3 mb-3"
          style={{ textAlign: "center", margin: "auto" }}
        >
          {politician.facebook && (
                      <iframe
                      title={facebookSRC}
                      src={facebookSRC}
                      width="468"
                      height="600"
                      style={{ border: "none", overflow: "hidden", borderRadius: "14px"}}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
          )}

          <div className="mt-3">
            {politician.youtube && (
              <iframe
                title={Math.random()}
                width="468"
                style={{ border: "none", overflow: "hidden", borderRadius: "14px"}}
                height="340"
                src={youtubeVidSrc}
                frameborder="0"
                allowfullscreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialMediaEmbed;
