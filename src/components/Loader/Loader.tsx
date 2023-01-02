import './Loader.css'

type LoaderTextProps = {
    text: string
}
export const Loader = (props : LoaderTextProps) => {
   
    return (
        <>
            <div id="loader" className="loader-wrapper">
                <span className="loader">
                    <span className="loader-inner">          
                </span>
                
                </span>
                <span className="loader-text"><h5>{props.text}</h5></span>
            </div>
        </>
    )
}