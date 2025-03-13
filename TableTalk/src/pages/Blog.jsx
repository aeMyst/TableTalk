import React, { useState, useEffect } from "react";
import "../elements/card.css";
import "./Blog.css";
import menuHidden from "../assets/svg/menuHidden.svg";
import placeImg from "../assets/svg/imagePlaceholder.svg";
import dislike from "../assets/svg/dislike.svg";
import like from "../assets/svg/like.svg";
import viewImg from "../assets/svg/view.svg";
import replyImg from "../assets/svg/reply.svg";

export default function Blog() {
  
  const[post1State, setPost1State] = useState(false);

  function openMenu(){
    setPost1State(prevState=>!prevState);
    
  }

  return (
    <div className="blog-container">
      <div className="card">

          <div className="sidebar">
            <div className ="sidebarTitle">
              <h1 className ="sidebarTitleText">Topics</h1>
            </div>
            <div className="sidebarContent">
              <a href="#" className="topics firstTopic">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Casting Shadows</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Catan</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Chess</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Clue</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Exploding Kittens</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Monopoly</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Pandemic</a><br></br>
              <a href="#" className="topics">&nbsp;&nbsp;<img src={placeImg}></img>&nbsp;&nbsp;Scrabble</a><br></br>
            </div>
          </div>
          
          <div className="mainTitle">
            <h1>Blog Posts</h1>
          </div>

          
          <div className="discPost1" onClick={openMenu}>
            <div className = "discPostText">
              <h2 id = "sample1">Tips on improving the chess rules</h2>
              <p>Let's say I wanted to talk about a chess play I made <a href = "#">linked here</a>. 
              I was wondering what happens if I change the rules to say 
              all pieces move in a straight line.</p>
            </div>
            <div className = "discPostBar">
              <div className = "discPostButtons">
                <div className = "discPostButtonsLeft">
                  <button className="buttons"><img src={viewImg} id="likeButton"></img></button>
                  <button className="buttons"><img src={replyImg} id="likeButton"></img></button>
                </div>
                <div className = "discPostButtonsRight">
                  <button className="buttons"><img src={like} id="likeButton"></img></button>
                  <button className="buttons"><img src={dislike} id="likeButton"></img></button>
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
            {post1State&&<div>You're looking healthy!?</div>}
          </div>

          <div className="discPost1">
            <div className = "discPostText">
              <h2 id = "sample1">Critique of the chess rules</h2>
              <p>Let's say I wanted to talk about a chess play I made <a href = "#">linked here</a>. 
              I was wondering what happens if I change the rules to say 
              all pieces move in a straight line.</p>
            </div>
            <div className = "discPostBar">
              <div className = "discPostButtons">
                <div className = "discPostButtonsLeft">
                  <button className="buttons"><img src={viewImg} id="likeButton"></img></button>
                  <button className="buttons"><img src={replyImg} id="likeButton"></img></button>
                </div>
                <div className = "discPostButtonsRight">
                  <button className="buttons"><img src={like} id="likeButton"></img></button>
                  <button className="buttons"><img src={dislike} id="likeButton"></img></button>
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
          
          <div className="discPost1">
            <div className = "discPostText">
              <h2 id = "sample1">I am unsure on the rules of chess</h2>
              <p>Let's say I wanted to talk about a chess play I made <a href = "#">linked here</a>. 
              I was wondering what happens if I change the rules to say 
              all pieces move in a straight line.</p>
            </div>
            <div className = "discPostBar">
              <div className = "discPostButtons">
                <div className = "discPostButtonsLeft">
                  <button className="buttons"><img src={viewImg} id="likeButton"></img></button>
                  <button className="buttons"><img src={replyImg} id="likeButton"></img></button>
                </div>
                <div className = "discPostButtonsRight">
                  <button className="buttons"><img src={like} id="likeButton"></img></button>
                  <button className="buttons"><img src={dislike} id="likeButton"></img></button>
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

