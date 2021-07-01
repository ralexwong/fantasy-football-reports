import * as React from "react";

interface Item {
  link: string,
  image: string,
  alt: string
}

const Footer: React.FC<null> = () => {

  const list: Array<Item> = [
    {
      link: 'https://github.com/ralexwong',
      image: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png',
      alt: 'github-icon'
    },
    {
      link: 'https://linkedin.com/iamwong',
      image: 'https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Linkedin_glyph_svg-512.png',
      alt: 'linkedin-icon'
    }
  ]
    return (
      <footer className='footer'>
        <div className='footer__logo-box'>
          <picture className='footer__logo'>
            <source srcSet='./images/default.png 1x, ./images/default.png 2x' media="(max-width: 35.9em)" />
            <img srcSet='./images/default.png 1x, ./images/default.png 2x' alt='footer_photo' className='footer__logo' />
          </picture>
        </div>

        <div className='footer__info'>
          <div className='footer__navigation'>
            <ul className='footer__list'>
              {list.map(item => {
                return <li key={item.link} className='footer__item'>
                  <a href='https://github.com/ralexwong' className='footer__link'>
                    <img src={item.image} alt={item.alt} style={{ width: '5rem', display: 'block' }} />
                  </a>
                  </li>
              })}
            </ul>
          </div>

          <p className='footer__copyright'>
            Built by Alexander Wong for personal use. Copyright &copy; by Alexander Wong. Credit to Jonas Schmedtmann for the template for the landing page.
          </p>
        </div>
      </footer>
    );
}

export default Footer;