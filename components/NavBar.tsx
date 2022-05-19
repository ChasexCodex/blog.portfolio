const NavBar = () => {
  return (
      <nav>
        <a href={process.env.APP_URL}>
          Elyas Al-Amri{"'"}s Blog
        </a>
        <div>
          <a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
            Portfolio
          </a>
        </div>
      </nav>
  )
}

export default NavBar
