import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Sidebar = () => {

    const [extened, setExtend] = useState(false)
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)


    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className={'sidebar'}
            style={{
                width: extened ? '250px' : '80px', // Dynamically set the width
                transition: 'width .5s ease', // Add smooth transition

            }}
        >
            <div className='top'>
                {/* getting previous value and returning not previous value */}
                <img onClick={() => setExtend(prev => !prev)} className='menu' src={assets.menu_icon} alt="menu_icon" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="plus_icon" />
                    {extened ? <p>New Chat</p> : null}
                </div>
                {extened ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="message_icon" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}

                    </div> : null
                }

            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question_icon" />
                    {extened ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History_icon" />
                    {extened ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="setting_icon" />
                    {extened ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
