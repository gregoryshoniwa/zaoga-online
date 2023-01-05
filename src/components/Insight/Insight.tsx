type InsightProps = {
    icon: string,
    title: string,
    amount: string,
    progress:string,
    currency: string,
    color: string,

}
export const Insight = ({icon, title, amount, progress,currency,color} : InsightProps) =>{
    return(
        <>
            
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span className="material-icons" style={{background : color}}>{icon}</span>
                        <h3 style={{fontSize: '18px'}}>{title}</h3>
                    </div>
                    <div className="middle">
                        <br></br>
                        <div className="left">
                            <h4>{currency} {amount}</h4>
                        </div>
                        
                    </div>
                </div>
            
        </>
    )
}