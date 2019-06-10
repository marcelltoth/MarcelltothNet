import * as React from 'react';
import './linkedin.css';

export const StackoverflowFlair : React.FC = () => {
    return <a href="https://stackoverflow.com/users/10614791/marcell-t%c3%b3th" target="_blank">
        <img src="https://stackoverflow.com/users/flair/10614791.png" 
            alt="profile for Marcell T&#243;th at Stack Overflow, Q&amp;A for professional and enthusiast programmers" 
            title="profile for Marcell T&#243;th at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
            style={{width: "100%", height: "auto"}}
            />
    </a>;
}

export const LinkedInFlair : React.FC = React.memo(() => {

    return <div className="LI-profile-badge">
        <a className="LI-simple-link" href="https://hu.linkedin.com/in/marcell-t%C3%B3th-38a80815b?trk=profile-badge" target="_blank">Marcell Tóth</a>
            <div>
                <div dir="ltr" className="LI-badge-container horizontal light" style={{display: 'inline-block', borderRadius: 2, wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    <div className="LI-profile-badge-header LI-name-container LI-row">
                        <div className="LI-col">
                            <div className="LI-profile-pic-container">
                                <img src="https://media.licdn.com/dms/image/C4E03AQGUN6DoeY97Ww/profile-displayphoto-shrink_200_200/0?e=1565222400&amp;v=beta&amp;t=5ifAcqJviJ7tRctzHj0wWEobX5KIQQpsih3zjLSsSKY" className="LI-profile-pic" alt="Marcell Tóth" />
                            </div>
                        </div>
                        <div className="LI-col LI-header">
                            <div className="LI-name">
                                <a href="https://hu.linkedin.com/in/marcell-t%C3%B3th-38a80815b?trk=profile-badge-name" target="_blank">Marcell Tóth</a>
                            </div>
                            <div className="LI-title">.NET/ReactJS expert, Team Leader, MCP, Autodidact</div>
                        </div>
                    </div>
                    <div className="LI-footer LI-row">
                        <a href="https://hu.linkedin.com/in/marcell-t%C3%B3th-38a80815b?trk=profile-badge-cta" target="_blank" className="LI-view-profile">View profile</a>
                        <span className="LI-logo">
                            <img src="https://static.licdn.com/scds/common/u/images/logos/linkedin/logo_linkedin_93x21_v2.png" alt="LinkedIn" className="LI-icon" />
                        </span>
                    </div>
                </div>
            </div>
        </div>;
});

export const GithubFlair : React.FC = () => {
    return <div 
        className="github-flair" 
        style={{width: "100%", height: 95, color: "rgb(114, 114, 114)", position: "relative", border: "2px solid rgb(218, 218, 218)", background: "rgb(218, 218, 218) none repeat scroll 0% 0%",
            padding: "5px 10px", fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""}}>
            <svg width="30" height="30" viewBox="0 0 250 250"
                style={{fill: "rgb(114, 114, 114)", color: "rgb(218, 218, 218)", position: "absolute", top: 0, right: 0, border: "0px none"}}>
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
            </svg>
            <div className="avatar" style={{textAlign: "center", position: 'relative', width: 75, height: 75, marginLeft: 5, marginTop: 3}}>
                <a href="https://github.com/marcelltoth" target="_blank">
                    <img src="https://avatars1.githubusercontent.com/u/543372" alt="Profile Avatar" style={{width: "100%", height: "100%", borderRadius: "50%"}} />
                </a>
            </div>
            <div className="info" style={{position: 'absolute', top: 10, bottom: 0, right: "20%", fontSize: 14}}>
                <div className="name" style={{fontWeight: "bold", fontSize: 16}}>
                    <a href="https://github.com/marcelltoth" target="_blank" style={{color: "rgb(114, 114, 114)"}}>
                        marcelltoth
                        </a>
                </div>
                <div className="meta">
                    <span title="Followers">
                        <svg height="12" viewBox="0 0 16 16" width="12" style={{fill: "rgb(114, 114, 114)"}}>
                            <path fillRule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4">
                            </path>
                        </svg> 
                        1&nbsp;&nbsp;
                    </span>
                    <span title="Total Public Repositories">
                        <svg height="12" viewBox="0 0 12 16" width="12" style={{fill: "rgb(114, 114, 114)"}}>
                            <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
                        </svg> 
                        14&nbsp;&nbsp;
                    </span>
                    <span title="Total Public Gists">
                        <svg height="12" viewBox="0 0 12 16" width="12" style={{fill: "rgb(114, 114, 114)"}}>
                            <path fillRule="evenodd" d="M7.5 5L10 7.5 7.5 10l-.75-.75L8.5 7.5 6.75 5.75 7.5 5zm-3 0L2 7.5 4.5 10l.75-.75L3.5 7.5l1.75-1.75L4.5 5zM0 13V2c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1zm1 0h10V2H1v11z"></path>
                        </svg> 
                        1
                    </span>
                </div>
                <div className="location">
                    <svg height="12" viewBox="0 0 12 16" width="12" style={{fill: "rgb(114, 114, 114)"}}>
                        <path fillRule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
                    </svg>
                    <span>&nbsp;Hungary</span>
                </div>
            </div>
        </div>;
}