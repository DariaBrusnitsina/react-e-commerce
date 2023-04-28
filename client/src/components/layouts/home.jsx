import React from "react";
import ItemCard from "../shopPages/itemCard";
import {useSelector} from "react-redux";
import {getItems} from "../../store/items";
import {HomePageTexts} from "../../content/texts";
import SkeletonHomeFirst from "../skeleton/skeletonHomeFirst";
import SkeletonHomeSecond from "../skeleton/skeletonHomeSecond";
import {getCategories} from "../../store/categories";
import Slider from "../common/slider";
import SkeletonCategories from "../skeleton/skeletonCategories";
import ArrowBtn from "../common/arrowButton";

const CssClasses = {
    HEADER: "home__header",
    HEADER_TEXT: "home__header--text",
    CATEGORIES: "home__categories",
    ABOUT: "about",
    ABOUT_TEXT: "about__text",
    ABOUT_TITLE: "about__title",
    ABOUT_SUBTITLE: "about__subtitle",
    ABOUT_DESCRIPTION: "about__description",
    FEATURED: "featured",
    FEATURED_TEXT: "featured__text",
}

const Home = () => {
    const items = useSelector(getItems());
    const categories = useSelector(getCategories())

    return (
    <>
        <header className={CssClasses.HEADER}>
            <div className="container">
                <div className={CssClasses.HEADER_TEXT}>
                    <h1>{HomePageTexts.HEADER_TITLE}</h1>
                    <p>{HomePageTexts.HEADER_SUBTITLE}</p>
                    <ArrowBtn text="Explore Collection" color="white" link="#featured"/>
                </div>
            </div>
        </header>

        <div className="container">
            <section className={CssClasses.CATEGORIES}>
                <h2>{HomePageTexts.CATEGORIES}</h2>
                    {categories ? <Slider array={categories} /> : <SkeletonCategories/>}
            </section>

            <section className={CssClasses.ABOUT}>
                <div className={CssClasses.ABOUT_TEXT}>
                    <p className={CssClasses.ABOUT_TITLE}>{HomePageTexts.ABOUT}</p>
                    <div className={CssClasses.ABOUT_SUBTITLE}><h2>{HomePageTexts.ABOUT_SUBTITLE}</h2></div>
                    <p className={CssClasses.ABOUT_DESCRIPTION}>{HomePageTexts.ABOUT_DESCRIPTION}</p>
                    <ArrowBtn text="Continue The Story" color="black" link="/about"/>
                </div>
                <img alt="about" src="https://sun9-38.userapi.com/impg/aSV7u-I1cEnii4hizZqoizl8wu9CVfYqkexZKg/673sCjPNW6U.jpg?size=1201x1600&quality=95&sign=0c10ee25414f60b6df6887882432de88&type=album" width={470}/>
            </section>

            <section className={CssClasses.FEATURED} id="featured">
                <div>
                    {items ?
                        <div>
                            <ItemCard item={items[0]} width={370} display="none"/>
                            <ItemCard item={items[5]} width={570} display="none"/>
                        </div>
                        :
                        <SkeletonHomeFirst/>
                    }
                </div>

                <div>
                    <div className={CssClasses.FEATURED_TEXT}>
                        <h3>{HomePageTexts.FEATURED}</h3>
                        <p>{HomePageTexts.FEATURED_TEXT}</p>
                    </div>

                    {items ?
                        <div>
                            <ItemCard item={items[3]} width={470} display="none"/>
                            <ItemCard item={items[6]} width={350} display="none"/>
                        </div>
                        :
                        <SkeletonHomeSecond/>
                    }
                </div>
            </section>
        </div>
    </>
    );
};

export default Home;
