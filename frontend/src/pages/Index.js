import {Link} from 'react-router-dom';
import Button from '../components/Button';

function Index() {
    return(
        <div id="contents">            
            <h1>Welcome</h1>
            <p>This simple web application or website was created to help a Game Master organize a roleplaying game.
            </p>

            <p>To get started, go to Games and select the active Game. Any Characters, Countries, Games, Items, Players, and Languages added will be associated with that Game. Keep in mind that you may not be able to see all of these items unless you have the correct Game selected.</p>
        </div>
    )
}

export default Index;