import { Fragment , useState} from "react"
import "./Forgetpass.css"

const Forgetpass = () => {
    const [inputs , setInputs] = useState({email:""})

    const {email} = inputs;

    const onChange = (e) => {
		//take every input
		setInputs({...inputs,[e.target.name] : e.target.value});
	}

    const onForget = async(e) => {

    }

    return(
        <Fragment>
            <div className="bg">
                <div className="Container">
                    <h1 className="FPtitle">Forget password</h1>
                    <form className="forget-form" onSubmit={onForget}>
                        <label>
                            <input type="email"
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={e => onChange(e)}/>
                        </label>
                        <button className="forget-btn">Submit</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default Forgetpass;