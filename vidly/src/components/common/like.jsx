import React, { Component } from "react";

class Like extends Component {
    renderClass() {
        let likeClass = "visible fa fa-heart";
        if (!this.props.movie.isLiked) likeClass += "-o";
        return likeClass;
    }

    render() {
        return (
            <i style={{"cursor": "pointer"}} className={this.renderClass()}></i>
        );
    }
}

export default Like;
