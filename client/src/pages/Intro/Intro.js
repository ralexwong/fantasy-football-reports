import { useRef } from "react";
import Header from './Header';
import About from './About';
import Platforms from './Platforms';
import Footer from '../../components/Footer'

import Features from './Features'
// import Reviews from './Reviews';
import Register from './Register';

const style = {
  color: "#777",
}

const Index = () => {
  const myRef = useRef(null)
  const scrollToSection = (ref) => window.scrollTo(0, ref.current.offsetTop);

  return (
    <div style={style} >
      <Header click={()=> scrollToSection(myRef)} />
      <About />
      <Features />
      <Platforms ref={myRef} />
      {/* <Reviews /> */}
      <Register />
      <Footer />
    </div>
  );
}

export default Index;
