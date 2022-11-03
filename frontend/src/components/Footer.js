import { useNavigate, Link } from 'react-router-dom';
import Button from './Button';

const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer>
            <p>Lost? Just go back to the Index page.</p>
            <Button onClick={() => navigate("/")}>Back to Index</Button>
        </footer>
    );
};