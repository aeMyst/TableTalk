import React from 'react';
import "../elements/card.css"
import "./Blog.css"

export default function Blog() {
  return (
    <div className="blog-container">
      <div className="card">
        <h1>TableTalk Blog</h1>
          <div className="sidebar">
          </div>
          <div className="discPost1">
            <div className = "discPostText">
              <h2 id = "sample1">This is a post</h2>
              <p>there will be a bunch of a stuff here including an <a href = "#">indepndent link</a></p>
            </div>
            <div className = "discPostBar">
              <div className = "discPostButtons">
                <div className = "discPostButtonsLeft">
                  <button className="buttons">View Post</button>
                  <button className="buttons">Reply</button>
                </div>
                <div className = "discPostButtonsRight">
                  <button className="buttons">Like</button>
                  <button className="buttons">Dislike</button>
                  </div>
              </div>
              <br></br>
              <p>Tags: &nbsp;
                  <a href="#" className="tags">Chess</a>, &nbsp;
                  <a href="#" className="tags">New release</a>, &nbsp;
                  <a href="#" className="tags">Cat</a>, &nbsp; 
                  <a href="#" className="tags">Rules</a>, &nbsp;
                  <a href="#" className="tags">Old release</a>, &nbsp;
              </p>
            </div>
          </div>

      </div>
    </div>
  );
} 