import React from "react";
import "./Project.css";

function Project({ item }) {
    return (
        <article className="card">
            <img
                className="card__background"
                src={item.image}
                alt={item.imageAlt}
                width="1920"
                height="2193"
            />
            <div className="card__content | flow">
                <div className="card__content--container | flow">
                    <h2 className="card__title">{item.title}</h2>
                    <div className="card__description pclass">
                        {
                            item.tags.map((item, index) => (
                                <div className="tags" key={index}>{item}</div>
                            ))
                        }
                    </div>
                </div>
                <div className="bottomRow">
                    {
                        item.url.length > 1
                            ? <a className="card__button githubButton" href={item.url} target="_blank">
                                <div>Link</div>
                                <img src={require('../../assets/webUrl.png')} className={"webIcon"} />
                            </a>
                            : <a className="card__button githubButton" href={item.github} target="_blank">
                                <div>Github</div>
                                <img src={require('../../assets/github.png')} className={"githubIcon"} />
                            </a>
                    }
                    <div className={"date"}>{item.date}</div>
                </div>
            </div>
        </article>
    )
}

export default Project;