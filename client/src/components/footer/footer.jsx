import './footer.css'

function Footer() {
  return (
    <div id='footer' className="footer">
        <div className="topline"></div>
        <div className="socialIcons">
        <i className=' footerIcons fa-brands fa-facebook-square'></i>
        <i className=' footerIcons fa-brands fa-twitter-square'></i>
        <i className=' footerIcons fa-brands fa-instagram-square'></i>
        <i className=' footerIcons fa-brands fa-github-square'></i>
        </div>
        <div className="policy">
            <span>Terms of use</span>
            <span>privacy Policy</span>
        </div>
        <div className="copyright">© {new Date().getFullYear()} blog website</div>
    </div>
  )
}

export default Footer