/* eslint-disable jsx-a11y/anchor-is-valid */
type LinkProps = {
    
    icon:string,
    title:string,
    
}
export const Link = (props: LinkProps) =>{
    return(
        <>
            <span className="material-icons">{props.icon}</span>
            <h3>{props.title}</h3>
        </>
    )
}