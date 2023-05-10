import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {
    const pathname = window.location.pathname
    const path =pathname==='/'?'home':pathname.substring(1)
    //when we goto certain path such as /login it doesn't highlights the menubar link corresponding to login or etc so we did default aactivestate to route path in url
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name)


        return(

                <Menu pointing secondary size='massive' color="teal">
                    <Menu.Item name = 'home' active={activeItem==='home'} onClick={handleItemClick} as={Link} to="/"/>
                    <Menu.Menu position='right'>
                         <Menu.Item name = 'login' active={activeItem==='login'} onClick={handleItemClick} as={Link} to="/login"/>
                         <Menu.Item name = 'register' active={activeItem==='register'} onClick={handleItemClick} as={Link} to="/register"/>
                    </Menu.Menu>
                </Menu>
            
        )
    }

export default MenuBar