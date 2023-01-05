/* eslint-disable jsx-a11y/anchor-is-valid */
type LinkProps = {
    
    icon:string,
    title:string,
    
}
export const Link = ({icon,title}: LinkProps) =>{
    return(
        <>
            <span className="material-icons">{icon}</span>
            <h3>{title}</h3>
        </>
    )
}