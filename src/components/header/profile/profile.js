import { useState } from 'react'
import { IconChevron } from '../../shared/icons/icon-chevron'
import { IconProfile } from '../../shared/icons/icon-profile'
import css from './profile.module.scss'

export const Profile = () => {
    const [isShow, setIsShow] = useState(false)

    return (
        <div className={css.profile} onClick={() => setIsShow(!isShow)}>
            <IconProfile/>
            <IconChevron/>
            {isShow && 
                <div className={css.list}>
                    <ul>
                        <li>Profile</li>
                        <li>Log Out</li>
                    </ul>
                </div>
            }
        </div>
    )
}