## FRONTEND STEPS

# go to terminal /frontend

# GO TO TAILWIND CSS WEBSITE AND FOLLOW THE STEPS

# npm create vite@latest . -- --template react

# npm install -D tailwindcss postcss autoprefixer

# npx tailwindcss init -p

# create folder in src/components/Header.jsx

# create folder in src/components/Navbar.jsx

# create folder in src/pages/Home.jsx

# install this npm i react-router-dom react-icons react-toastify axios

# in main.jsx

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
<BrowserRouter>
<App />
</BrowserRouter>
);

# then create a routes in App.jsx, and create all those components

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";

const App = () => {
return (

<main className="overflow-hidden text-[#404040] bg-primary">
<Header />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/collection" element={<Collection />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/product/:productId" element={<Product />} />
<Route path="/cart" element={<Cart />} />
<Route path="/login" element={<Login />} />
<Route path="/place-order" element={<PlaceOrder />} />
<Route path="/orders" element={<Orders />} />
<Route path="/verify" element={<Verify />} />
</Routes>
</main>
);
};

export default App;

# next well add the initial design for Header.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import { GiBeachBag } from "react-icons/gi";
import { TbArrowNarrowRight } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const Header = () => {
const [menuOpened, setMenuOpened] = useState(false);
const [token, setToken] = useState(true);
const navigate = useNavigate();

const toggleMenu = () => {
setMenuOpened((prev) => !prev);
};

const logout = () => {
localStorage.removeItem("token");
setToken("");
navigate("/login");
};

return (

<header className="py-5 w-full bg-white">
<div className="max-padd-container flexBetween">
{/_ Logo _/}
<Link to={"/"} className="bold-24 flex-1 xl:hidden">
<h5 className="bg-white shadow-sm text-secondary text-md flexCenter h-40 w-38 px-2 absolute -top-5 rounded-full">
ShirtThreads
</h5>
</Link>

        {/* Navbar */}
        <div className="flex-1">
          <Navbar />
        </div>

        {/* Logo */}
        <Link to={"/"} className="bold-24 flex-1 hidden xl:flex">
          <h5 className="bg-white shadow-sm text-secondary text-md flexCenter h-40 w-38 px-2 absolute -top-5 rounded-full">
            Shirt Threads
          </h5>
        </Link>

        {/* right side */}
        <div className="flexBetween gap-x-2 xs:gap-x-8">
          {!menuOpened && (
            <FaBarsStaggered
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-2xl"
            />
          )}
          <div>
            <FaSearch className="text-xl cursor-pointer" />
          </div>
          <Link to={"/cart"} className="flex relative">
            <GiBeachBag className="text-[25px]" />
            <span className="bg-secondary text-white medium-14 absolute right-0.5 -top-3 flexCenter w-5 h-5 rounded-full shadow-inner">
              0
            </span>
          </Link>

          <div className="group relative">
            <div onClick={() => !token && navigate("/login")}>
              <FaRegCircleUser className="text-2xl cursor-pointer" />
            </div>
            {token && (
              <>
                <ul className="bg-white shadow-sm p-3 w-32 ring-1 ring-slate-900/15 rounded absolute right-0 hidden group-hover:flex flex-col">
                  <li
                    onClick={() => navigate("/orders")}
                    className="flexBetween cursor-pointer"
                  >
                    <p>Orders</p>
                    <TbArrowNarrowRight className="text-[19px] opacity-50" />
                  </li>
                  <hr className="my-2" />
                  <li onClick={logout} className="flexBetween cursor-pointer">
                    <p>Orders</p>
                    <TbArrowNarrowRight className="text-[19px] opacity-50" />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>

);
};

export default Header;

# then will make the navbar

# in Header.jsx edit the code to this

{/_ Navbar _/}

<div className="flex-1">
<Navbar
menuOpened={menuOpened}
toggleMenu={toggleMenu}
containerStyles={`${
              menuOpened
                ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl"
                : "hidden xl:flex gap-x-5 xl:gap-x-8 medium-15 rounded-full px-2 py-1"
            }`}
/>
</div>

        {/* Logo */}

# then in Navbar.jsx update the code

import { FaWindowClose } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { SiAtlassian, SiGooglehome, SiMaildotcom } from "react-icons/si";
import { BsCollectionFill } from "react-icons/bs";

const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
const navItems = [
{ to: "/", label: "Home", icon: <SiGooglehome /> },
{ to: "/collection", label: "Collection", icon: <BsCollectionFill /> },
{ to: "/about", label: "Home", icon: <SiAtlassian /> },
{
to: "/mailto:support@shirtthreads.com",
label: "Contact",
icon: <SiMaildotcom />,
},
];

return (

<nav className={containerStyles}>
{/_ close button inside navbar _/}
{menuOpened && (
<>
<FaWindowClose
            onClick={toggleMenu}
            className="text-2xl self-end cursor-pointer relative left-8 text-secondary"
          />
{/_ logo _/}
<Link to={"/"} className="bold-24 !text-[20px] mb-10">
<h4 className="text-secondary">Shirt Threads</h4>
</Link>
</>
)}
{navItems.map(({ to, label, icon }) => (
<div key={label} className="inline-flex">
<NavLink
to={to}
className={({ isActive }) =>
isActive ? "active-link flexCenter gap-x-2" : "flexCenter gap-x-2"
}
onClick={menuOpened && toggleMenu} >
{icon}
<h5>{label}</h5>
</NavLink>
</div>
))}
</nav>
);
};

export default Navbar;

# next create hero section, in Home.jsx

import Hero from "../components/Hero";

const Home = () => {
return <Hero />;
};

export default Home;

# then create the components/Hero.jsx

import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";

const Hero = () => {
return (

<section className="max-padd-container max-xl:mt-8 mb-16">
<div className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[736px] w-full rounded-tl-3xl rounded-tr-3xl mt-6">
<div className="relative max-w-[777px] top-48 ">
<h5 className="flex items-baseline gap-x-2 uppercase text-secondary medium-18">
MODERN COLLECTION <BsFire />
</h5>
<h1 className="h1 capitalize max-w-[611px] ">
It’s not your usual 50% off holiday sale.
</h1>
<p className="pl-2 max-w-lg mt-6 mb-8 border-l-4 border-l-secondary">
Finally, a holiday sale you’ll actually like. Shop sweatshirts,
socks, throws & more.
</p>
<div className="flex gap-2 sm:gap-6 mt-14">
<Link className="btn-dark max-sm:!p-3">Latest Products</Link>
<Link className="btn-secondary max-sm:!p-3">Popular Products</Link>
</div>
</div>
</div>
</section>
);
};

export default Hero;

# create the About.jsx

import aboutImg from "../assets/about.png";
import { RiDoubleQuotesL } from "react-icons/ri";

const About = () => {
const statistics = [
{ label: "Satisfied Customers", value: 99 },
{ label: "Exclusive Products", value: 22 },
{ label: "New Products", value: 5 },
];

return (

<section>
<div className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6">
{/_ container _/}
<div className="flex flex-col xl:flex-row gap-10">
{/_ left side _/}
<div className="flex-1 relative">
<div className="bg-secondary rounded-3xl rounded-tr-[155px] w-[488px]">
<img src={aboutImg} alt="" />
</div>
<div className="bg-white absolute bottom-0 left-16 max-w-xs p-4 rounded-2xl flexCenter flex-col shadow-sm">
<span className="relative bottom-8 p-3 text-white h-12 w-12 flex items-center rounded-full bg-secondary">
<RiDoubleQuotesL className="text-2xl" />
</span>
<p className="text-center relative bottom-3">
ShirtThreads delivers premium, stylish shirts with a seamless
online shopping experience. We combine fashion, comfort, and
quality for every shirt you need.
</p>
</div>
</div>
{/_ right side _/}
<div className="flex-1 flex justify-center flex-col">
<span className="medium-18 text-secondary">
Unveiling Our Journey
</span>
<h2 className="h2 max-w-[472px]">
Redefine how people experience style and comfort
</h2>
<p className="py-5">
Our journey began with a simple goal: to redefine how people
experience style and comfort in every shirt they wear. From
sourcing the finest materials to crafting designs that resonate
with individuality, we’ve poured passion into every thread. Join
us as we unfold the milestones, values, and vision that continue
to inspire our path forward.
</p>
{/_ statistics container _/}
<div className="flex flex-wrap gap-4">
{statistics.map((statistics, index) => (
<div
                    key={index}
                    className="bg-primary text-secondary p-4 rounded-lg"
                  >
<div className="flex items-center gap-1">
<h3 className="h3">{statistics.value}</h3>
<h4 className="bold-22">+</h4>
</div>
<p>{statistics.label}</p>
</div>
))}
</div>
</div>
</div>
</div>
</div>
</section>
);
};

export default About;

# Footer.jsx

import { Link } from "react-router-dom";

const Footer = () => {
return (

<footer className="bg-primary py-10 sm:pt-16 lg:pt-24">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
<div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
<div className="text-2xl font-bold">Shirt Threads</div>
<p className="mt-7 text-base leading-relaxed text-muted-foreground">
premium-quality shirts that redefine comfort and style. Shop now
and elevate your wardrobe with designs tailored for every
occasion—because you deserve the best!
</p>

            <ul className="mt-9 flex items-center space-x-3">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-gray-20 focus:bg-gray-20"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-gray-20 focus:bg-gray-20"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-gray-20 focus:bg-gray-20"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-gray-20 focus:bg-gray-20"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="/about"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Features{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Works{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Career{" "}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Customer Support{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Delivery Details{" "}
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Terms & Conditions{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-secondary focus:text-primary"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Subscribe to newsletter
            </p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2"
                />
              </div>

              <Link
                size="lg"
                className="btn-secondary w-full mt-3 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4"
              >
                Subscribe
              </Link>
            </form>
          </div>
        </div>

        <hr className="mb-10 mt-16" />

        <p className="text-center text-sm text-muted-foreground">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by Shirt
          Threads
        </p>
      </div>
    </footer>

);
};

export default Footer;

# then update the About.jsx

        </div>
      </div>
      <Footer />
    </section>

);
};

export default About;

# then in Home.jsx

import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Home = () => {
return (
<>
<Hero />

<Footer />
</>
);
};

export default Home;

# now lets display some dummy data as new arrivals

# first create ShopContext, src/context/ShopContext.jsx

import { createContext } from "react";
import { products } from "../assets/data.js";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
const currency = "S";
const delivery_charges = 10;

const value = { products, currency, delivery_charges };

return (
<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
);
};

export default ShopContextProvider;

# then create the src/components/NewArrivals.jsx

import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import Item from "./Item";

const NewArrivals = () => {
const { products } = useContext(ShopContext);
const [newArrivals, setNewArrivals] = useState([]);

useEffect(() => {
const data = products.slice(0, 10);
setNewArrivals(data);
}, [products]);

return (

<section>
<Title title={"New Arrivals"} titleStyles={"text-center"} />
{/_ container _/}
<div className="">
{newArrivals.map((product) => (
<div key={product._id}>
<Item product={product} />
</div>
))}
</div>
</section>
);
};

export default NewArrivals;

# then the src/components/Title.jsx

const Title = ({ title, titleStyles }) => {
return (

<div className={`${titleStyles} pb-20`}>
<span className="h2 capitalize pb-1 relative after:w-2/3 after:h-1 after:bg-secondary after:absolute after:-bottom-1 after:right-0 after:rounded">
{title}
</span>
</div>
);
};

export default Title;

# then the src/components/Item.jsx

const Item = ({ product }) => {
return <div>Item</div>;
};

export default Item;

# and then import the NewArrivals to Home.jsx

import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";

const Home = () => {
return (
<>
<Hero />
<NewArrivals />

<Footer />
</>
);
};

export default Home;

# also to make the context functional, in main.jsx

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
<BrowserRouter>
<ShopContextProvider>
<App />
</ShopContextProvider>
</BrowserRouter>
);

# now lets add design to it, in NewArrivals.jsx

import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import Item from "./Item";

const NewArrivals = () => {
const { products } = useContext(ShopContext);
const [newArrivals, setNewArrivals] = useState([]);

useEffect(() => {
const data = products.slice(0, 10);
setNewArrivals(data);
}, [products]);

return (

<section className="max-padd-container py-16">
<Title title={"New Arrivals"} titleStyles={"text-center"} />
{/_ container _/}
<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
{newArrivals.map((product) => (
<div key={product._id}>
<Item product={product} />
</div>
))}
</div>
</section>
);
};

export default NewArrivals;

# and in Item.jsx

import { Link } from "react-router-dom";

const Item = ({ product }) => {
return (

<div className="ring-1 ring-slate-900/5 rounded-xl bg-white overflow-hidden">
<Link to={`/product/${product._id}`} className="flexCenter relative">
<img src={product.image[0]} alt="productImg" />
</Link>
<div className="p-3">
<h4 className="h4 line-clamp-1 !my-0">{product.name}</h4>
<div className="flexBetween pt-1">
<p className="font-bold">{product.category}</p>
<h5 className="h5 text-secondary pr-2">${product.price}.00</h5>
</div>
<p className="line-clamp-2 py-1">{product.description}</p>
</div>
</div>
);
};

export default Item;

# next well display a dummy data to Popular Products, in src/components/PopularProducts.jsx

import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import Item from "./Item";

const PopularProducts = () => {
const { products } = useContext(ShopContext);
const [popularProducts, setPopularProducts] = useState([]);

useEffect(() => {
const data = products.filter((item) => item.popular);
setPopularProducts(data.slice(0, 5));
}, [products]);

return (

<section className="max-padd-container py-16">
<Title title={"Popular Products"} titleStyles={"text-center"} />
{/_ container _/}
<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
{popularProducts.map((product) => (
<div key={product._id}>
<Item product={product} />
</div>
))}
</div>
</section>
);
};

export default PopularProducts;

# and then import this to Home.jsx

import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import PopularProducts from "../components/PopularProducts";

const Home = () => {
return (
<>
<Hero />
<NewArrivals />
<PopularProducts />

<Footer />
</>
);
};

export default Home;

# next well add a feature component, src/components/Features.jsx

import Title from "./Title";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { LiaUndoAltSolid } from "react-icons/lia";

const Features = () => {
return (

<section className="max-padd-container py-16">
{/_ title _/}
<Title title={"Our Features"} titleStyles={"text-center"} />
{/_ container _/}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 bg-white rounded-xl">
<div className="p-4 rounded-3xl">
<TbTruckDelivery className="bold-32 mb-3 text-secondary" />
<h4 className="h4 capitalize">Fast Delivery</h4>
<p>
At ShirtThreads, we prioritize your convenience. With real-time
tracking and swift dispatch times, you’ll never have to wait long to
get your favorite styles.
</p>
</div>
<div className="p-4 rounded-3xl">
<LiaUndoAltSolid className="bold-32 mb-3 text-yellow-500" />
<h4 className="h4 capitalize">Easy Return</h4>
<p>
Enjoy hassle-free shopping with our Easy Return policy, ensuring
quick and seamless returns for your ultimate convenience and
satisfaction.
</p>
</div>
<div className="p-4 rounded-3xl">
<RiSecurePaymentLine className="bold-32 mb-3 text-teal-500" />
<h4 className="h4 capitalize">Secure Payment System</h4>
<p>
Shop with confidence using our Secure Payment system, safeguarding
your transactions with advanced encryption and trusted payment
gateways.
</p>
</div>
</div>
</section>
);
};

export default Features;

# and then call the component to Home.jsx

import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import PopularProducts from "../components/PopularProducts";

const Home = () => {
return (
<>
<Hero />
<NewArrivals />
<PopularProducts />
<Features />

<Footer />
</>
);
};

export default Home;

# NOW we create the functionality in Collection.jsx, its filtering products

import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";

const Collection = () => {
const { products } = useContext(ShopContext);
const [category, setCategory] = useState([]);
const [subCategory, setSubCategory] = useState([]);
const [sortType, setSortType] = useState("relevant");
const [filteredProducts, setFilteredProducts] = useState([]);

const toggleFilter = (value, setState) => {
setState((prev) =>
prev.includes(value)
? prev.filter((item) => item !== value)
: [...prev, value]
);
};

const applyFilters = () => {
let filtered = [...products];

    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subCategory.length) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    return filtered;

};

const applySorting = (productsList) => {
switch (sortType) {
case "low":
return productsList.sort((a, b) => a.price - b.price);
case "high":
return productsList.sort((a, b) => b.price - a.price);
default:
return productsList; // Default to relevant
}
};

// apply filters and sorting whenever filters or sort type change
useEffect(() => {
let filtered = applyFilters();
let sorted = applySorting(filtered);
setFilteredProducts(sorted);
}, [category, subCategory, sortType, products]);

return (

<section className="max-padd-container">
<div className="flex flex-col sm:flex-row gap-8 mt-8 xl:mt-6">
{/_ Filter Options _/}
<div className="min-w-60 bg-white p-4 rounded-2xl">
{/_ Search Box _/}

          {/* Category Filter */}
          <div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl">
            <h5 className="h5 mb-4">Categories</h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex gap-2 medium-14 text-gray-30">
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    value={cat}
                    className="w-3"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl">
            <h5 className="h5 mb-4">Types</h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                <label
                  key={subCat}
                  className="flex gap-2 medium-14 text-gray-30"
                >
                  <input
                    onChange={(e) =>
                      toggleFilter(e.target.value, setSubCategory)
                    }
                    type="checkbox"
                    value={subCat}
                    className="w-3"
                  />
                  {subCat}
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="medium-14 h-8 w-full border border-slate-900/5 bg-primary text-gray-30 rounded-lg px-2 outline-none mt-6"
          >
            <option value="relevant" className="font-medium text-sm">
              Sort by: Relevant
            </option>
            <option value="low" className="font-medium text-sm">
              Sort by: Low
            </option>
            <option value="high" className="font-medium text-sm">
              Sort by: High
            </option>
          </select>
        </div>

        {/* Right Side */}
        <div className="bg-white p-4 rounded-2xl">
          <Title title={"Our Collection"} />
          {/* product container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Item product={product} key={product._id} />
              ))
            ) : (
              <p className="capitalize">
                No products found for selected filets.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>

);
};

export default Collection;

# NOW well add the functionality for searching product

# in ShopContect.jsx edit the code to this

import { createContext, useState } from "react";
import { products } from "../assets/data.js";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
const currency = "S";
const delivery_charges = 10;

const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(false);

const contextValue = {
products,
currency,
delivery_charges,
search,
setSearch,
showSearch,
setShowSearch,
};

return (
<ShopContext.Provider value={contextValue}>
{props.children}
</ShopContext.Provider>
);
};

export default ShopContextProvider;

# create the component in components/ShowSearch.jsx

import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const ShowSearch = () => {
const { search, setSearch, showSearch, setShowSearch } =
useContext(ShopContext);
const [visible, setVisible] = useState(false);
const location = useLocation();

useEffect(() => {
if (location.pathname.includes("collection")) {
setVisible(true);
} else {
setVisible(false);
}
}, [location]);

return showSearch && visible ? (

<section className="py-4 pb-7">
<div className="text-center bg-primary">
<div className="inline-flex items-center justify-center ring-1 ring-slate-900/5 px-3 py-1.5 rounded-full bg-primary">
<input
type="text"
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search here..."
className="border-none outline-none w-full bg-primary text-sm"
/>
<div className="bg-primary text-center">
<FaSearch className="cursor-pointer" />
</div>
</div>
</div>
</section>
) : null;
};

export default ShowSearch;

# then import the showsearch in Collection.jsx

import Item from "../components/Item";
import ShowSearch from "../components/ShowSearch";

const Collection = () => {

---

return (

<section className="max-padd-container">
<div className="flex flex-col sm:flex-row gap-8 mt-8 xl:mt-6">
{/_ Filter Options _/}
<div className="min-w-60 bg-white p-4 rounded-2xl">
{/_ Search Box _/}
<ShowSearch />
{/_ Category Filter _/}
<div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl">

# then in Header.jsx

import { FaSearch } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
const { setShowSearch } = useContext(ShopContext);
const [menuOpened, setMenuOpened] = useState(false);

---

 <div>
            <FaSearch
              onClick={() => setShowSearch((prev) => !prev)}
              className="text-xl cursor-pointer"
            />
          </div>
          <Link to={"/cart"} className="flex relative">
            <GiBeachBag className="text-[25px]" />

# and then the functionality for the search will be on Collection.jsx

import ShowSearch from "../components/ShowSearch";

const Collection = () => {
const { products, search, showSearch } = useContext(ShopContext);
const [category, setCategory] = useState([]);

---

const applyFilters = () => {
let filtered = [...products];

    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length) {

---

// apply filters and sorting whenever filters or sort type change
useEffect(() => {
let filtered = applyFilters();
let sorted = applySorting(filtered);
setFilteredProducts(sorted);
}, [category, subCategory, sortType, products, search, showSearch]);

return (

## NEXT when the user click on individual product it will display the data but for this time its only on console log

# in Product.jsx

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
const { productId } = useParams();
const { products, currency } = useContext(ShopContext);
const [product, setProduct] = useState(false);
const [image, setImage] = useState("");
const [size, setSize] = useState("");

const fetchProductData = async () => {
products.map((item) => {
if (item.\_id === productId) {
setProduct(item);
setImage(item.image[0]);
console.log(item);
}
});
};

useEffect(() => {
fetchProductData();
}, [productId, products]);

return (

<section>
<div className="max-padd-container">
{/_ product data _/}
<div className="max-padd-container flex gap-12 flex-col xl:flex-row bg-white py-16 rounded-2xl">
{/_ product image _/}
<div className="flex flex-1 gap-x-2 xl:flex-1">
<div className="flexCenter flex-col gap-[7px] flex-wrap">
{product.image.map((item, i) => (
<img
onClick={() => setImage(item)}
src={item}
key={i}
alt="productImg"
className="max-h-[89px] rounded-lg"
/>
))}
</div>
<div className="max-h-[377px] w-auto flex">
<img src={image} alt="" className="rounded-xl bg-gray-10" />
</div>
</div>
{/_ product info _/}
<div>
<h3>{product.name}</h3>
{/_ rating & price _/}
<div>
<h3>
{currency}
{product.price}
</h3>
<div>
<div>
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStarHalfStroke />
</div>
</div>
</div>
</div>
</div>
</div>
</section>
);
};

export default Product;

# as we can notice when we refresh on a single product it will have a map error on the console

# to solve thism in Product.jsx

const Product = () => {
const { productId } = useParams();
const { products, currency } = useContext(ShopContext);
const [product, setProduct] = useState(false);
const [image, setImage] = useState("");
const [size, setSize] = useState("");

const fetchProductData = async () => {
const selectedProduct = products.find((item) => item.\_id === productId);
if (selectedProduct) {
setProduct(selectedProduct);
setImage(selectedProduct.image[0]);
}
};

useEffect(() => {
fetchProductData();
}, [productId, products]);

if (!product) {
return <div>...Loading</div>;
}

return (

# and then the initial UI, Product.jsx

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar, FaStarHalfStroke, FaTruckFast } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoBagCheckSharp } from "react-icons/io5";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
const { productId } = useParams();
const { products, currency } = useContext(ShopContext);
const [product, setProduct] = useState(false);
const [image, setImage] = useState("");
const [size, setSize] = useState("");

const fetchProductData = async () => {
const selectedProduct = products.find((item) => item.\_id === productId);
if (selectedProduct) {
setProduct(selectedProduct);
setImage(selectedProduct.image[0]);
}
};

useEffect(() => {
fetchProductData();
}, [productId, products]);

if (!product) {
return <div>...Loading</div>;
}

return (

<section>
<div className="max-padd-container mt-8 xl:mt-6">
{/_ product data _/}
<div className="max-padd-container flex gap-12 flex-col xl:flex-row bg-white py-16 rounded-2xl">
{/_ product image _/}
<div className="flex flex-1 gap-x-2 xl:flex-1">
<div className="flexCenter flex-col gap-[7px] flex-wrap">
{product.image.map((item, i) => (
<img
onClick={() => setImage(item)}
src={item}
key={i}
alt="productImg"
className="max-h-[89px] rounded-lg"
/>
))}
</div>
<div className="max-h-[377px] w-auto flex">
<img src={image} alt="" className="rounded-xl bg-gray-10" />
</div>
</div>
{/_ product info _/}
<div className="flex-[1.5] rounded-2xl px-7">
<h3 className="h3 !my-2.5">{product.name}</h3>
{/_ rating & price _/}
<div className="flex items-baseline gap-x-5">
<h3 className="h3">
{currency}
{product.price}
</h3>
<div className="flex items-center gap-x-2 text-secondary mb-2">
<div className="flex gap-x-2 text-secondary text-xl">
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStarHalfStroke />
</div>
<span>(251)</span>
</div>
</div>
<p>{product.description}</p>
<div className="flex flex-col gap-4 my-4 mb-5">
<div className="flex gap-2">
{[...product.sizes]
.sort((a, b) => {
const order = ["S", "M", "L", "XL", "XXL"];
return order.indexOf(a) - order.indexOf(b);
})
.map((item, i) => (
<button
onClick={() => setSize(item)}
key={i}
className={`${
                        item === size
                          ? "bg-tertiary text-white"
                          : "border-slate-900/5"
                      } border-[1.5px] border-tertiary h-8 w-10 bg-primary rounded-md`} >
{item}
</button>
))}
</div>
</div>
<div className="flex items-center gap-x-4">
<button className="btn-dark w-1/2 flexCenter gap-x-2 capitalize">
Add to cart
<IoBagCheckSharp />
</button>
<button className="btn-light">
<FaHeart />
</button>
<div>
<div className="flex items-center gap-x-2 mt-2">
<FaTruckFast className="text-lg" />
<span className="medium-14">
Free Delivery on orders over Php5000
</span>
</div>
<hr className="my-4 w-2/3" />
<div className="mt-2 flex flex-col gap-1">
<p>Authenticity You Can Trust</p>
<p>Enjoy Cash On Delivery for your Convenience</p>
<p>Easy Returns and Exchange Within 7 Days</p>
</div>
</div>
</div>
<RelatedProducts
              category={product.category}
              subCategory={product.subCategory}
            />
</div>
<Footer />
</div>
</div>
</section>
);
};

export default Product;

# then create the src/components/RelatedProducts.jsx

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Item from "./Item";

const RelatedProducts = ({ category, subCategory }) => {
const { products } = useContext(ShopContext);
const [related, setRelated] = useState([]);

useEffect(() => {
if (products.length > 0) {
let filtered = products.slice();

      filtered = filtered.filter((item) => category === item.category);
      filtered = filtered.filter((item) => subCategory === item.subCategory);

      setRelated(filtered.slice(0, 5));
    }

}, [products]);

return (

<div className="max-padd-container py-16">
<Title title={"Related Products"} />
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
{related.map((product, i) => (
<Item product={product} key={product._id} />
))}
</div>
</div>
);
};

export default RelatedProducts;

# NEXT WELL ADD FUNCTIONALITY TO ADDING TO CART BUTTON

# in ShopContext.jsx

import { createContext, useEffect, useState } from "react";
import { products } from "../assets/data.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

---

const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(false);
const [cartItems, setCartItems] = useState([]);

// Adding items to cart
const addToCart = async (itemId, size) => {
if (!size) {
toast.error("Please select a size before adding to cart");
return;
}

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] -= 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

};

const getCartCount = () => {
let totalCount = 0;
for (const items in cartItems) {
for (const item in cartItems[items]) {
try {
if (cartItems[items][item] > 0) {
totalCount += cartItems[items][item];
}
} catch (error) {
console.log(error);
}
}
}
return totalCount;
};

useEffect(() => {
console.log(cartItems);
}, [cartItems]);

const contextValue = {
products,
currency,
delivery_charges,
search,
setSearch,
showSearch,
setShowSearch,
addToCart,
getCartCount,
};

return (
<ShopContext.Provider value={contextValue}>
{props.children}
</ShopContext.Provider>
);
};

export default ShopContextProvider;

# in App.jsx

import Verify from "./pages/Verify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
return (

<main className="overflow-hidden text-[#404040] bg-primary">
<ToastContainer />
<Header />

# in Product.jsx

const Product = () => {
const { productId } = useParams();
const { products, currency, addToCart } = useContext(ShopContext);
const [product, setProduct] = useState(false);

---

</div>
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => addToCart(product._id, size)}
                className="btn-dark w-1/2 flexCenter gap-x-2 capitalize"
              >
                Add to cart
                <IoBagCheckSharp />

# and then render the cart count on Header.jsx

import { ShopContext } from "../context/ShopContext";

const Header = () => {
const { setShowSearch, getCartCount } = useContext(ShopContext);
const [menuOpened, setMenuOpened] = useState(false);

---

      <Link to={"/cart"} className="flex relative">
            <GiBeachBag className="text-[25px]" />
            <span className="bg-secondary text-white medium-14 absolute right-0.5 -top-3 flexCenter w-5 h-5 rounded-full shadow-inner">
              {getCartCount()}
            </span>
          </Link>

# LETS DISPLAY ALL THE CART ITEMS ON CART PAGE, in Cart.jsx

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaRegWindowClose } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Cart = () => {
const { getCartCount, products, cartItems, currency } =
useContext(ShopContext);
const [cartData, setCartData] = useState([]);
const [quantities, setQuantities] = useState({});

useEffect(() => {
const tempData = [];
const initialQuantities = {};
for (const items in cartItems) {
for (const item in cartItems[items]) {
if (cartItems[items][item] > 0) {
tempData.push({
\_id: items,
size: item,
quantity: cartItems[items][item],
});
initialQuantities[`${items}-${item}`] = cartItems[items][item];
}
}
}
setCartData(tempData);
}, [cartItems]);

return (

<section>
<div className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
{/_ Title _/}
<div className="flex items-baseline gap-x-4">
<h3 className="h3">
Cart <span className="text-secondary">List</span>
</h3>
<p className="bold-20">{getCartCount()} items</p>
</div>
{/_ container _/}
<div className="mt-6">
{cartData.map((item, i) => {
const productData = products.find(
(product) => product.\_id === item.\_id
);
const key = `${item._id}-${item.size}`;
return (
<div key={i} className="p-1 rounded-lg">
<div className="flex items-center gap-x-3">
<div className="flex items-start gap-6">
<img
                        src={productData.image[0]}
                        alt=""
                        className="w-16 sm:w-18 rounded"
                      />
</div>
<div className="flex flex-col w-full">
<div className="flexBetween">
<h5 className="h5 !my-0 line-clamp-1">
{productData.name}
</h5>
<FaRegWindowClose className="cursor-pointer text-secondary" />
</div>
<p className="bold-14 my-0.5">{item.size}</p>
<div className="flexBetween">
<div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
<button className="p-1.5 bg-white text-secondary rounded-full shadow-md">
<FaMinus className="text-xs" />
</button>
<p className="px-2">{quantities[key]}</p>
<button className="p-1.5 bg-white text-secondary rounded-full shadow-md">
<FaPlus className="text-xs" />
</button>
</div>
<h4 className="h4">
{currency}
{productData.price}
</h4>
</div>
</div>
</div>
<hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2" />
</div>
);
})}
</div>
</div>
</div>
</section>
);
};

export default Cart;

# and then in ShopContext.jsx

const contextValue = {
products,
currency,
delivery_charges,
search,
setSearch,
showSearch,
setShowSearch,
addToCart,
getCartCount,
cartItems,
};

# lets increment decrement the cart item

# in ShopContext.jsx

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/data.js";

---

    return totalCount;

};

// updating the cart item quantity
const updateQuantity = async (itemId, size, quantity) => {
let cartData = structuredClone(cartItems);
cartData[itemId][size] = quantity;
setCartItems(cartData);
};

---

const contextValue = {
products,
currency,
delivery_charges,
search,
setSearch,
showSearch,
setShowSearch,
addToCart,
getCartCount,
cartItems,
updateQuantity,

# in Cart.jsx

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaRegWindowClose } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CartTotal from "../components/CartTotal";

const Cart = () => {
const {
getCartCount,
products,
cartItems,
currency,
updateQuantity,

} = useContext(ShopContext);
const [cartData, setCartData] = useState([]);
const [quantities, setQuantities] = useState({});

useEffect(() => {
const tempData = [];
const initialQuantities = {};
for (const items in cartItems) {
for (const item in cartItems[items]) {
if (cartItems[items][item] > 0) {
tempData.push({
\_id: items,
size: item,
quantity: cartItems[items][item],
});
initialQuantities[`${items}-${item}`] = cartItems[items][item];
}
}
}
setCartData(tempData);
setQuantities(initialQuantities);
}, [cartItems]);

const increment = (id, size) => {
const key = `${id}-${size}`;
const newValue = quantities[key] + 1;
setQuantities((prev) => ({ ...prev, [key]: newValue }));
updateQuantity(id, size, newValue);
};

const decrement = (id, size) => {
const key = `${id}-${size}`;
if (quantities[key] > 1) {
const newValue = quantities[key] - 1;
setQuantities((prev) => ({ ...prev, [key]: newValue }));
updateQuantity(id, size, newValue);
}
};

return (

<section>
<div className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
{/_ Title _/}
<div className="flex items-baseline gap-x-4">
<h3 className="h3">
Cart <span className="text-secondary">List</span>
</h3>
<p className="bold-20">{getCartCount()} items</p>
</div>
{/_ container _/}
<div className="mt-6">
{cartData.map((item, i) => {
const productData = products.find(
(product) => product.\_id === item.\_id
);
const key = `${item._id}-${item.size}`;
return (
<div key={i} className="p-1 rounded-lg">
<div className="flex items-center gap-x-3">
<div className="flex items-start gap-6">
<img
                        src={productData.image[0]}
                        alt=""
                        className="w-16 sm:w-18 rounded"
                      />
</div>
<div className="flex flex-col w-full">
<div className="flexBetween">
<h5 className="h5 !my-0 line-clamp-1">
{productData.name}
</h5>
<FaRegWindowClose
onClick={() => updateQuantity(item.\_id, item.size, 0)}
className="cursor-pointer text-secondary"
/>
</div>
<p className="bold-14 my-0.5">{item.size}</p>
<div className="flexBetween">
<div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
<button className="p-1.5 bg-white text-secondary rounded-full shadow-md">
<FaMinus
onClick={() => decrement(item.\_id, item.size)}
className="text-xs"
/>
</button>
<p className="px-2">{quantities[key]}</p>
<button className="p-1.5 bg-white text-secondary rounded-full shadow-md">
<FaPlus
onClick={() => increment(item.\_id, item.size)}
className="text-xs"
/>
</button>
</div>
<h4 className="h4">
{currency}
{productData.price}
</h4>
</div>
</div>
</div>
<hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2" />
</div>
);
})}
</div>

        </div>
      </div>
    </section>

);
};

export default Cart;

# next well be the total of our cart

# in ShopContext.jsx

// Getting total cart amount
const getCartAmount = () => {
let totalAmount = 0;
for (const items in cartItems) {
let itemInfo = products.find((product) => product.\_id == items);
for (const item in cartItems[items]) {
try {
if (cartItems[items][item] > 0) {
totalAmount += itemInfo.price \* cartItems[items][item];
}
} catch (error) {
console.log(error);
}
}
}
return totalAmount;
};

const contextValue = {
products,
currency,
delivery_charges,
search,
setSearch,
showSearch,
setShowSearch,
addToCart,
getCartCount,
cartItems,
updateQuantity,
getCartAmount,

# then create src/components/CartTotal.jsx

import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);

return (

<div className="w-full">
<h3 className="bold-22 mb-5">
Cart <span className="text-secondary">Total</span>
</h3>
<div className="flexBetween pt-3">
<h4 className="h4">Subtotal:</h4>
<p className="bold-16">
{currency} {getCartAmount()}.00
</p>
</div>
<hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
<div className="flexBetween pt-3">
<h4 className="h4">Shipping Fee:</h4>
<p className="bold-16">
{getCartAmount() === 0
? "0.00"
: `${currency} ${delivery_charges}.00`}
</p>
</div>
<hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
<div className="flexBetween pt-3">
<h4 className="h4">Total:</h4>
<p className="bold-16">
{currency}
{getCartAmount() === 0 ? "0.00" : getCartAmount() + delivery_charges}
.00
</p>
</div>
<hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
</div>
);
};

export default CartTotal;

# next well proceed to checkout

# in ShopContext.jsx

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/data.js";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
const currency = "₱";
const delivery_charges = 10;
const navigate = useNavigate();

---

updateQuantity,
getCartAmount,
navigate,
};

# in Cart.jsx

const Cart = () => {
const {
getCartCount,
products,
cartItems,
currency,
updateQuantity,
navigate,
} = useContext(ShopContext);

---

             <hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2" />
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <CartTotal />
              <button
                onClick={() => navigate("/place-order")}
                className="btn-secondary mt-7"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

);

# lets create the UI for place order,

# in Cart.jsx

<hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2" />
                </div>
              );
            })}
          </div>
          <div className="flex my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <button
                onClick={() => navigate("/place-order")}
                className="btn-secondary mt-7"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

# then in PlaceOrder.jsx

import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";

const PlaceOrder = () => {
const { navigate } = useContext(ShopContext);
const [method, setMethod] = useState("cod");

return (

<section>
{/_ container _/}
<div className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6">
<div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
<div className="flex flex-1 flex-col gap-3 text-[95%]">
{/_ delivery information _/}
<h3 className="h3">Delivery Information</h3>
<div className="flex gap-3">
<input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
<input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
</div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />

              <input
                type="text"
                name="street"
                placeholder="Street"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
            </div>
            {/* cart total */}
            <div className="flex flex-1 flex-col">
              <CartTotal />
              {/* Payment Method */}
              <div className="my-6">
                <h3 className="bold-20 mb-5">
                  Payment <span className="text-green-400">Method</span>
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMethod("stripe")}
                    className={`${
                      method === "stripe" ? "text-green-400 !font-bold" : ""
                    } btn-light !py-1`}
                  >
                    Stripe
                  </button>
                  <button
                    onClick={() => setMethod("cod")}
                    className={`${
                      method === "cod" ? "text-green-400 !font-bold" : ""
                    } btn-light !py-1`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={() => navigate("/orders")}
                  className="btn-dark max-xs:w-full"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>

);
};

export default PlaceOrder;

# create the UI for Orders.jx

import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
const { products, currency } = useContext(ShopContext);

return (

<section>
<div className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
{/_ title _/}
<div className="">
<h3 className="h3">
Orders <span className="text-secondary">List</span>
</h3>
</div>
{/_ container _/}
{products.slice(1, 5).map((item, i) => (
<div key={i}>
<div className="py-4 text-gray-700 flex flex-col gap-4">
<div className="flex gap-x-3 w-full">
{/_ image _/}
<div className="flex gap-6">
<img
                      src={item.image[0]}
                      alt=""
                      className="w-[77px] rounded-lg"
                    />
</div>
{/_ order info _/}
<div className="block w-full">
<h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
<div className="flexBetween">
<div>
<div className="flex items-center gap-x-2 sm:gap-x-3">
<div className="flexCenter gap-x-2">
<h5 className="medium-14">Price:</h5>
<p>
{currency}
{item.price}
</p>
</div>
<div className="flexCenter gap-x-2">
<h5 className="medium-14">Quantity:</h5>
<p>{item.quantity}</p>
</div>
<div className="flexCenter gap-x-2">
<h5 className="medium-14">Size:</h5>
<p>{item.size}</p>
</div>
</div>
<div className="flex items-center gap-x-2">
<h5 className="medium-14">Date:</h5>
<p className="text-gray-400">
{new Date(item.date).toDateString()}
</p>
</div>
<div className="flex items-center gap-x-2">
<h5 className="medium-14">Payment</h5>
<p className="text-gray-400">paymentMethod</p>
</div>
</div>
{/_ Status & button _/}
<div className="flex flex-col xl:flex-row gap-3">
<div className="flex items-center gap-2">
<p className="min-w-2 h-2 rounded-full bg-green-500"></p>
<p>status</p>
</div>
<button className="btn-secondary !p-1.5 !text-xs">
Track Order
</button>
</div>
</div>
</div>
</div>
</div>
<hr className="mx-auto h-[1px] bg-gray-900/10 mt-2" />
</div>
))}
</div>
</div>
</section>
);
};

export default Orders;

# next lets create the login UI

# in Header.jsx

const Header = () => {
const { setShowSearch, getCartCount } = useContext(ShopContext);
const [menuOpened, setMenuOpened] = useState(false);
const [token, setToken] = useState(false);
const navigate = useNavigate();

# then in Login.jsx

import { useState } from "react";
import loginImg from "../assets/Login.png";

const Login = () => {
const [currState, setCurrState] = useState("Sign Up");

return (

<section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
{/_ container _/}
<div className="flex h-full w-full">
{/_ Form Side _/}
<div className="flex w-full sm:w-1/2 items-center justify-center">
<form className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800">
<div className="w-full mb-4">
<h3 className="bold-36">{currState}</h3>
</div>
{currState === "Sign Up" && (
<div className="w-full">
<label htmlFor="name" className="medium-15">
Name
</label>
<input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                />
</div>
)}
<div className="w-full">
<label htmlFor="email" className="medium-15">
Email
</label>
<input
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
              />
</div>
<div className="w-full">
<label htmlFor="password" className="medium-15">
Password
</label>
<input
                type="password"
                placeholder="Password"
                required
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
              />
</div>
<button className="btn-secondary w-full mt-5 !py-[9px]">
{currState === "Sign Up" ? "Sign Up" : "Login"}
</button>
<div className="w-full flex flex-col gap-y-3">
<div className="hover:underline medium-15 cursor-pointer">
Forgot your password?
</div>
{currState === "Login" ? (
<div className=" medium-15">
Don’t have an account?{" "}
<span
onClick={() => setCurrState("Sign Up")}
className="cursor-pointer hover:underline" >
Create an account
</span>
</div>
) : (
<div className=" medium-15">
Already have an account?{" "}
<span
onClick={() => setCurrState("Login")}
className="cursor-pointer hover:underline" >
Login
</span>
</div>
)}
</div>
</form>
</div>
{/_ image side _/}
<div className="w-1/2 hidden sm:block">
<img src={loginImg} alt="" className="object-cover h-full w-full" />
</div>
</div>
</section>
);
};

export default Login;

## NOW LETS GO TO BACKEND

## SEE README ON BACKEND FOLDER, LOCATE HEADERS => add => token = the copied token from logging in as admin

## THENN DELETE A PRODUCT, IT IS SUCCESSFUL IF YOU HAVE TOKEN, BUT IF YOU DONT HAVE IT, IT IS DENIED!

## NOW WE FINISHED FETCHING DATA ON OUR BACKEND TO DISPLAY ON LIST

## WE GO HERE IN FRONTEND TO RENDER THAT DATA FROM BACKEND

# add .env in frontend folder

VITE_BACKEND_URL = "http://localhost:4000"

# then in ShopContext.jsx, well display the data first in console.log for test

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
const currency = "₱";
const delivery_charges = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");

---

    return totalAmount;

};

const getProductsData = async () => {
try {
const response = await axios.get(backendUrl + "/api/product/list");
console.log(response.data);
} catch (error) {
console.log(error);
}
};

useEffect(() => {
getProductsData();
}, []);

const contextValue = {

# now we render it to frontend UI all the product data, still in ShopContext.jsx

const getProductsData = async () => {
try {
const response = await axios.get(backendUrl + "/api/product/list");
if (response.data.success) {
setProducts(response.data.products);
} else {
toast.error(response.data.message);
}
} catch (error) {
console.log(error);
toast.error(error.message);
}
};

useEffect(() => {

## NEXT WELL SAVE THE USER AUTH DATA TO BACKEND FROM FRONTEND ENTRY

## Login data from frontend to backend

# in ShopContext.jsx

const [cartItems, setCartItems] = useState([]);
const [token, setToken] = useState("");

// Adding items to cart
const addToCart = async (itemId, size) => {

---

    navigate,
    backendUrl,
    token,
    setToken,

};

return (
<ShopContext.Provider value={contextValue}>

# then in Login.jsx, first we only console.log the result first to test it

import { useContext, useState } from "react";
import loginImg from "../assets/Login.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
const [currState, setCurrState] = useState("Login");
const { token, setToken, backendUrl } = useContext(ShopContext);

const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

const onSubmitHandler = async (e) => {
e.preventDefault();
try {
if (currState === "Sign Up") {
const response = await axios.post(backendUrl + "/api/user/register", {
name,
email,
password,
});
console.log(response.data);
} else {
}
} catch (error) {
console.log(error);
}
};

return (

---

{/_ Form Side _/}

<div className="flex w-full sm:w-1/2 items-center justify-center">
<form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
<div className="w-full mb-4">
<h3 className="bold-36">{currState}</h3>
</div>
{currState === "Sign Up" && (
<div className="w-full">
<label htmlFor="name" className="medium-15">
Name
</label>
<input
onChange={(e) => setName(e.target.value)}
value={name}
type="text"
placeholder="Name"
required
className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
/>
</div>
)}
<div className="w-full">
<label htmlFor="email" className="medium-15">
Email
</label>
<input
onChange={(e) => setEmail(e.target.value)}
value={email}
type="email"
placeholder="Email"
required
className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
/>
</div>
<div className="w-full">
<label htmlFor="password" className="medium-15">
Password
</label>
<input
onChange={(e) => setPassword(e.target.value)}
value={password}
type="password"
placeholder="Password"
required
className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
/>
</div>

# test the user credentials, Login.jsx

const onSubmitHandler = async (e) => {
e.preventDefault();
try {
if (currState === "Sign Up") {
const response = await axios.post(backendUrl + "/api/user/register", {
name,
email,
password,
});
if (response.data.success) {
setToken(response.data.token);
localStorage.setItem("token", response.data.token);
} else {
toast.error(response.data.message);
}
} else {
const response = await axios.post(backendUrl + "/api/user/login", {
email,
password,
});
console.log(response.data);
}
} catch (error) {

# display the error message while logging in using toast, in Login.jsx

          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

};

# save and remove token login auth from local storage

# in ShopContext.jsx

useEffect(() => {
if (!token && localStorage.getItem("token")) {
setToken(localStorage.getItem("token"));
}
getProductsData();
}, []);

# then in Login.jsx

import { useContext, useEffect, useState } from "react";
import loginImg from "../assets/Login.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
const [currState, setCurrState] = useState("Login");
const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

const [name, setName] = useState("");

---

} catch (error) {
console.log(error);
toast.error(error.message);
}
};

useEffect(() => {
if (token) {
navigate("/");
}
}, [token]);

return (

# then in Header.jsx

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import { GiBeachBag } from "react-icons/gi";
import { TbArrowNarrowRight } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
const { setShowSearch, getCartCount, navigate, token, setToken } =
useContext(ShopContext);
const [menuOpened, setMenuOpened] = useState(false);

## NOW LETS GO BACK TO BACKEND FOR OUR CART HANDLER CONTROLLERS TO SAVE FROM OUR DATABASE

---

## NOW AFTER CREATING ALL THE FUNCTIONALITY ON BACKEND, LETS EMPLEMENT IT HERE

# adding product to cart with different sizes counted

# in ShopContext.jsx

// Adding items to cart
const addToCart = async (itemId, size) => {
if (!size) {
toast.error("Please select a size before adding to cart");
return;
}

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

};

## 11:42 CART BUTTON DELAY

## delay button increment decrement item product solved

# in ShopContext.jsx

// updating the cart item quantity
const updateQuantity = async (itemId, size, quantity) => {
let cartData = structuredClone(cartItems);
cartData[itemId][size] = quantity;
setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to update the cart on the server.");

        // Rollback to previous state in case of an error
        const previousCartData = structuredClone(cartItems);
        previousCartData[itemId][size] -= 1; // Or handle it dynamically
        setCartItems(previousCartData);
      }
    }

};

# then in Cart.jsx

const increment = async (id, size) => {
const newQuantity = cartItems[id][size] + 1;
await updateQuantity(id, size, newQuantity); // Await to ensure synchronization
};

---

const decrement = async (id, size) => {
if (cartItems[id][size] > 1) {
const newQuantity = cartItems[id][size] - 1;
await updateQuantity(id, size, newQuantity); // Await to ensure synchronization
}
};

# save current data on cart to localstorage

# in ShopContext.jsx

const getUserCart = async (token) => {
try {
const response = await axios.post(
backendUrl + "/api/cart/get",
{},
{ headers: { token } }
);
if (response.data.success) {
setCartItems(response.data.cartData);
}
} catch (error) {
console.log(error);
toast.error(error.message);
}
};

useEffect(() => {
if (!token && localStorage.getItem("token")) {
setToken(localStorage.getItem("token"));
getUserCart(localStorage.getItem("token"));
}
getProductsData();
}, []);

## NEXT WELL CREATE THE PATMENT METHOD, FIRST GO TO BACK README

---

## PLACE ORDER TEST IN CONSOLE

# in PlaceOrder.jsx

const PlaceOrder = () => {
const {
navigate,
backendUrl,
token,
setToken,
cartItems,
setCartItems,
getCartAmount,
delivery_charges,
products,
} = useContext(ShopContext);
const [method, setMethod] = useState("COD");

const [formData, setFormData] = useState({
firstName: "",
lastName: "",
email: "",
street: "",
city: "",
state: "",
zipcode: "",
country: "",
phone: "",
});

const onChangeHandler = (e) => {
const name = e.target.name;
const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));

};

const onSubmitHandler = async (e) => {
e.preventDefault();
try {
let orderItems = [];
for (const items in cartItems) {
for (const item in cartItems[items]) {
if (cartItems[items][item] > 0) {
const itemInfo = structuredClone(
products.find((product) => product.\_id === items)
);
if (itemInfo) {
itemInfo.size = item;
itemInfo.quantity = cartItems[items][item];
orderItems.push(itemInfo);
}
}
}
}
console.log(orderItems);
} catch (error) {
console.log(error);
}
};

return (

<section>
{/_ container _/}
<form onSubmit={onSubmitHandler} className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6">
<div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
<div className="flex flex-1 flex-col gap-3 text-[95%]">
{/_ delivery information _/}
<h3 className="h3">Delivery Information</h3>
<div className="flex gap-3">
<input
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
<input
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
</div>

              <input
                onChange={onChangeHandler}
                value={formData.email}
                type="email"
                name="email"
                placeholder="Email"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <input
                onChange={onChangeHandler}
                value={formData.phone}
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />

              <input
                onChange={onChangeHandler}
                value={formData.street}
                type="text"
                name="street"
                placeholder="Street"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.city}
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.state}
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.country}
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
            </div>
            {/* cart total */}

---

<button type="submit" className="btn-dark max-xs:w-full">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />

## PLACE ORDER THROUGHT COD

# in ShopContext.jsx

    token,
    setToken,
    setCartItems,

};

# PlaceOrder.jsx

import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

---

products,
} = useContext(ShopContext);
const [method, setMethod] = useState("cod");

---

const onSubmitHandler = async (e) => {
e.preventDefault();
try {
let orderItems = [];
for (const items in cartItems) {
for (const item in cartItems[items]) {
if (cartItems[items][item] > 0) {
const itemInfo = structuredClone(
products.find((product) => product.\_id === items)
);
if (itemInfo) {
itemInfo.size = item;
itemInfo.quantity = cartItems[items][item];
orderItems.push(itemInfo);
}
}
}
}

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges,
      };

      switch (method) {
        // api calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

};

return (

<section>
{/_ container _/}

\*--------------------------------------------------\

<CartTotal />
              {/* Payment Method */}
              <div className="my-6">
                <h3 className="bold-20 mb-5">
                  Payment <span className="text-green-400">Method</span>
                </h3>
                <div className="flex gap-3">
                  <div
                    onClick={() => setMethod("stripe")}
                    className={`${
                      method === "stripe" ? "text-green-400 !font-bold" : ""
                    } btn-light !py-1 cursor-pointer`}
                  >
                    Stripe
                  </div>
                  <div
                    onClick={() => setMethod("cod")}
                    className={`${
                      method === "cod" ? "text-green-400 !font-bold" : ""
                    } btn-light !py-1 cursor-pointer`}
                  >
                    Cash on Delivery
                  </div>
                </div>

## NOW LETS DISPLAY THE ORDER DATA ON USER PROFILE ORDER PAGE

## FIRST GOTO ADMIN README

---

## LETS RENDER ALL THE ORDER OF A USER TO PROFILE PAGE

## in Orders.jsx

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
const { backendUrl, token, currency } = useContext(ShopContext);

const [orderData, setOrderData] = useState([]);

const loadOrderData = async () => {
try {
if (!token) {
return null;
}
const response = await axios.post(
backendUrl + "/api/order/userorders",
{},
{ headers: { token } }
);
if (response.data.success) {
let allOrdersItem = [];
response.data.orders.map((order) => {
order.items.map((item) => {
item["status"] = order.status;
item["payment"] = order.payment;
item["paymentMethod"] = order.paymentMethod;
item["date"] = order.date;
allOrdersItem.push(item);
});
});
setOrderData(allOrdersItem.reverse());
}
} catch (error) {
console.log(error);
}
};

useEffect(() => {
loadOrderData();
}, [token]);

return (

<section>
<div className="max-padd-container">
<div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
{/_ title _/}
<div className="">
<h3 className="h3">
Orders <span className="text-secondary">List</span>
</h3>
</div>
{/_ container _/}
{orderData.map((item, i) => (
<div key={i}>

---

<div className="flex items-center gap-x-2">
                          <h5 className="medium-14">Payment</h5>
                          <p className="text-gray-400">{item.paymentMethod}</p>
                        </div>
                      </div>
                      {/* Status & button */}
                      <div className="flex flex-col xl:flex-row gap-3">
                        <div className="flex items-center gap-2">
                          <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                          <p>{item.status}</p>
                        </div>
                        <button
                          onClick={loadOrderData}
                          className="btn-secondary !p-1.5 !text-xs"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mx-auto h-[1px] bg-gray-900/10 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;

---

## LETS EMPLEMENT THE STRIPE PAYMENT FUNCTIONALITY

# in PlaceOrder.jsx

switch (method) {
// api calls for COD
case "cod":
const response = await axios.post(
backendUrl + "/api/order/place",
orderData,
{ headers: { token } }
);
if (response.data.success) {
setCartItems({});
navigate("/orders");
} else {
toast.error(response.data.message);
}
break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

## NOW LETS VERIFY THE PAYMENT, GOTO ADMIN README

---
