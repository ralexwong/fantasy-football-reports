function Card({ title, src, lowerbox }: {title: string, src: string, lowerbox: JSX.Element }) {
    return (
        <div>
            <p className="reportTitle">{title}</p>

            <div className='cards'>
                <div className='cards__outerBox'>
                    <div className='cards__innerBox'>
                        <img
                            crossOrigin="anonymous"
                            referrerPolicy="origin"
                            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => event.currentTarget.setAttribute("src", "./images/nfl-logo.jpg")}
                            src={src}
                            alt="poop"
                            className="cards__image" />
                    </div>
                </div>
                <div className='cards__lowerBox'>
                    <p className="cards__name">
                        {lowerbox}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card
