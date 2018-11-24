import React, {Component} from "react";
import {connect} from "react-redux";

class Profile extends Component {
    
    render(){
        console.log(this.props ,"PROPSSS");
        return (
            <div>profile</div>
        )
    }
}

const mapStateToProps = state => ({
    user: state
});

export default connect(mapStateToProps, null)(Profile);