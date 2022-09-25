import React, { Component } from "react";

class Paginator extends Component {
    state = {};

    renderClass(pageN) {
        let classN = "page-item";
        return pageN === this.props.currentPage
            ? (classN += " active")
            : classN;
    }

    render() {
        return (
            <nav aria-label="...">
                <ul className="pagination pagination-sm">
                    {this.props.navPagesDisp.map((pageN) => (
                        <li
                            key={pageN - 1}
                            onClick={() => this.props.onPageSel(pageN)}
                            className={this.renderClass(pageN)}
                            aria-current="page"
                        >
                            <span className="page-link">{pageN}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default Paginator;
