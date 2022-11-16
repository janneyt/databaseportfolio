

const ShowIfLoaded = ({isLoading, children}) => {
    if (isLoading) {
        return(
            <>
                <div id="loading">
                    <p>Loading...</p>
                    <div className="lds-hourglass"></div>
                </div>
            </>
        )
    }
    return <>{children}</>
};

export default ShowIfLoaded;