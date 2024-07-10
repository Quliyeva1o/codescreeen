import React, { useState } from 'react';
import styles from './index.module.scss';
import Textarea from '@mui/joy/Textarea';
import SendIcon from '@mui/icons-material/Send';
const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <div className={styles.btndiv}>
                <button className={styles.button} onClick={toggleChat}>
                    salam
                </button>
            </div>
            {isChatOpen && (
                <div className={styles.mesajlasma}>
                    <section>
                        <div>
                            <div>
                                <h2>HOYTS</h2>
                            </div>
                        </div>
                    </section>
                    <div className={styles.chat}>
                        <div>
                            <div>
                                <div className={styles.saat}>
                                    <p>17:00</p>
                                </div>
                                <div className={styles.him}>
                                    <p>hoyts bot</p>
                                    <div>
                                        <span>
                                            gfdjshbfn
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.text}>
                        <form action="">
                            <Textarea name="Outlined" placeholder="Type in here…" variant="outlined" />
                            <button>
                            <SendIcon/>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;
