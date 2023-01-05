import { Insight } from '../../../components/Insight/Insight'
import './Home.css'
export const Home = () => {
    return(
        <>
            <h1>Dashbaord</h1>

            <div className="date">
                <label>start : </label>
                <input type="date" />
            </div>
            <div className="date">
                <label>end : </label>
                <input type="date" />
            </div>

            <div className="insights">
                <Insight icon='analytics' title='Income' currency='$USD' amount='25,450' progress='85%' color='#7380ec' />
                <Insight icon='bar_chart' title='Costs' currency='$USD' amount='12,653,000.23' progress='65%' color='#ff7782'/>
                <Insight icon='stacked_line_chart' title='Districts' currency='$ZWL' amount='278,450' progress='39%' color='#41f1b6'/>
                <Insight icon='bar_chart' title='Provinces' currency='$ZWL' amount='185,450' progress='44%' color='#ffbb55'/>
            </div>
            <div className="graph-section">
                <h2>Recent Orders</h2>
                <div className="graphs">
                    <div className="graph">

                    </div>
                    <div className="graph">

                    </div>
                </div>

            </div>
            
        </>
        
    )
}