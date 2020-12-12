import React from 'react'
import SettingsStore from '../../Store/SettingsStore'
import './About.scss'

const About = () => {
    const lang = SettingsStore.useContainer().lang
    return (
        <div className='about-main'>
            <header>
                {content.title[lang]}
                <img onClick={() => window.history.back()} alt='close' src={require('../../img/close_svg.svg')} />
            </header>
            <p>
                {content.data[lang]}
            </p>
        </div>
    )
}

interface HashTable<T> {
    [key: string] : T
}

const aboutEn = 
<>
    The game to poke around with.
    <h2>How to play</h2>
    <p>
        The playing field consists of colored cells. Each cell either belongs to a player or it doesn't. <br/>
        Cells that belong to players are highlighted with a black outline. <br/>
        The current colors of the players are on top. Your color is located on the left. <br/>
        The move is made by selecting a color from the available colors. After selecting all the cells with the color you selected, if they do not belong to other players,
        and which are adjacent to your cells, will be captured by you.
    </p>
    <h2>The end of the game</h2>
    <p>
        When one of the players scores more than half of the points, the game ends.
    </p>
</>

const aboutRu = 
<>
    Игрушка что бы позалипать.
    <h2>Как играть</h2>
    <p>
        Игровое поле состоит из разноцветных клеток. Каждая клетка либо принадлежит какому-то игроку, либо нет. <br/>
        Клетки, которые принадлежат игрокам, выделены черной обводкой.  <br/>
        Текущие цвета игроков, находятся сверху. Ваш цвет расположен слева. <br/>
        Ход осуществляется выбором цвета из свобоных цветов. После выбора все клетки с цветом, который вы выбрали, если они не принадлежпт другим игрокам, 
        и которые примыкают к вашим клеткам, будут захвачены вами. 
    </p>
    <h2>Окончание игры</h2>
    <p>
        Когда кто-либо из игроков наберет более половины очков, игра заканчивается.
    </p>
</>

const content : HashTable<HashTable<JSX.Element>> = {
    title: {
        'en': <h1>About</h1>,
        'ru': <h1>Об этом</h1>
    },
    data: {
        'en': aboutEn,
        'ru': aboutRu
    }
}

export default About