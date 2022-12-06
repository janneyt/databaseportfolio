import Button from './Button';

const Footer = () => {
    return (
        <footer>
            <p className='small'>Lost? Just go back to the Home Page:</p>
            <a href="/"><Button className='nav-button'>Home</Button></a>
        </footer>
    );
};

export default Footer;