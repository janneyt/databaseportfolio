import Button from './Button';

const Footer = () => {
    return (
        <footer>
            <p class='small'>Lost? Just go back to the Home Page:</p>
            <a href="/"><Button class='nav-button'>Home</Button></a>
        </footer>
    );
};

export default Footer;