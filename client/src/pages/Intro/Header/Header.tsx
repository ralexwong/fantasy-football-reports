type Props = {
    click: React.MouseEventHandler<HTMLButtonElement>
}

const Header = (props: Props) => {
    return (
        <header className='introHeader'>
            <div className='introHeader__text-box'>
                <h1 className='heading-primary'>
                    <span className='heading-primary--main'>Fantasy Football</span>
                    <span className='heading-primary--sub'>Weekly Reports</span>
                </h1>

                <button style={{ fontSize: '2rem' }} onClick={props.click} className='btn btn--white'>Choose Your Platform!</button>  
            </div>
        </header>
    )
}

export default Header;
