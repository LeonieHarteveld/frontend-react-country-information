import './header.css';


function Header({ img }) {

    return (
        <>
            <header>
                <img src={img} alt="wereldkaart"/>
                <h1>World regions</h1>
            </header>

        </>
    )
}

export default Header
