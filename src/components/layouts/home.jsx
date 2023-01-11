import React from "react";
import CategoryCard from "../categoryCard";
import Navigation from "../navigation";

const Home = () => {
    return (
    <>
        <header className="home__header">
            <div className="container">
                <Navigation/>
                <div className="home__header--text">
                    <h1>Lorem ipsumips</h1>
                    <p>Voluptate nulla atque minus dolores quas minima doloremque.</p>
                    <div className="arrow--btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                        <a href="#!">Explore Collection</a>
                    </div>
                </div>
            </div>
        </header>
        <div className="container">
            <section className="home__categories">
                <h2>Categories</h2>
                <div className="home__categories--row">
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </div>

            </section>

            <section className="home__about">
                <div className="home__about--text">
                    <p className="home__about--section-name">About</p>
                    <div className="home__about--title"><h2 >Lorem, ipsum dolor sit 2012</h2></div>
                    <p className="home__about--discription">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, asperiores ex, aperiam nesciunt maiores minima sunt eum eligendi quo illum esse vel impedit repudiandae recusandae. Labore, at! Perspiciatis, aspernatur tempore!</p>
                    <div className="arrow--btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                        <a href="#!">Continue The Story</a>
                    </div>
                </div>
            </section>
        </div>
    </>
    );
};

export default Home;
