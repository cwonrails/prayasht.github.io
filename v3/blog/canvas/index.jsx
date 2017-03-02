import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import * as PIXI from 'pixi.js';

// import { TweetThis, FacebookShare } from '../components/Social';
// import avatar from '../../static/img/avatar.jpg';

exports.data = {
  title: 'Undiscovered Colors',
  date: '11/28/2016',
  description: "A memoir to a brief excursion in Argentina."
}

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {

    this.cielo, this.montanas, this.persona;
    this.mouse = { x: 0, y: 0 };

    // Setup PIXI Canvas
    this.renderer = PIXI.autoDetectRenderer(640, 338);
    this.refs.ucCanvas.appendChild(this.renderer.view);
    this.interaction = new PIXI.interaction.InteractionManager(this.renderer);

    // Create the root of the scene graph
    this.stage = new PIXI.Container();
    this.stage.width = 640;
    this.stage.height = 338;

    PIXI.loader.add(["cielo.jpg", "montanas.png", "persona.png"]).load(() => {
      // resize();
      this.cielo = new PIXI.Sprite(PIXI.loader.resources["cielo.jpg"].texture);
      this.cielo.scale.set(1.15, 1.15);

      this.montanas = new PIXI.Sprite(PIXI.loader.resources["montanas.png"].texture);
      this.montanas.scale.set(1.15, 1.15);

      this.persona = new PIXI.Sprite(PIXI.loader.resources["persona.png"].texture);
      this.persona.scale.set(1.15, 1.15);

      this.stage.addChild(this.cielo);
      this.stage.addChild(this.montanas);
      this.stage.addChild(this.persona);

      this.animate();
    });
  }

  animate() {
    this.frame = requestAnimationFrame(this.animate);
    this.updateMousePosition();
    this.renderer.render(this.stage);
  }

  updateMousePosition() {
    this.mouse.x = this.interaction.mouse.global.x;
    this.mouse.y = this.interaction.mouse.global.y;
    console.log("x: ", this.mouse.x, "y: ", this.mouse.y);
  }

  render() {
    return <div className="ucCanvas" ref="ucCanvas"></div>
  }
}

class Index extends Component {

  fadeIn() {
    var elem = ReactDOM.findDOMNode(this);
  	elem.style.opacity = 0;
    window.requestAnimationFrame(function() {
  		elem.style.transition = "opacity 750ms";
  		elem.style.opacity = 1;
  	});
  }

  componentDidMount() {
  	this.fadeIn();
  }

  render() {
    const { route } = this.props;
    console.log(route);
    const { page: { data: post } } = route;
    const path = post.path = route.path;
    // const thumbnail = post.thumbnail ? `http://effulgence.io/${path}${post.thumbnail}` : `http://effulgence.io/${avatar}`;
    const docTitle = `${post.title} - ${config.blogTitle}`;
    // const nextPosts = post.readNext ? getPostsFromPaths(post.readNext, posts)
    //  : getNextPosts(path, posts);
    return (
      <section className='content'>
        <Helmet
          title={docTitle}
          meta={[
            { name: 'description', content: post.description },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: docTitle },
            // { property: 'og:image', content: thumbnail },
            { property: 'article:author', content: 'https://facebook.com/prayasht' },
            { property: 'article:published_time', content: `${moment(post.date, 'MM/DD/YYYY').format()}` },
            { name: 'twitter:description', content: post.description },
            { name: 'twitter:title', content: docTitle }
          ]}
        />
        <article id='blog-body'>
          <header className='blog-header'>
            <h2>{post.title}</h2>
            <div>
              <time>{moment(post.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}</time> &middot; {post.words} words &middot; {post.readTime}
            </div>
          </header>
          <div className='post-content'>
            HELLO!
            <Canvas />
          </div>
        </article>
        <br />
      </section>
    )
  }
}

export default Index
