const Header = ({children}) => {
    return (
        <header>
            <h1>RPG Tracks</h1>
            <p>Keeping all those things together.</p>
            {children}
        </header>
    );
};

export default Header;