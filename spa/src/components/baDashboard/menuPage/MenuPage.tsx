import React, { useState, useEffect } from 'react';
import { PagePermission } from 'model';
import { Link } from 'react-router-dom';
import './MenuPage.scss';

type MenuPageProps = {
    linkPageCurrent: string,
    pages: PagePermission[]
};

const MenuPage: React.FC<MenuPageProps> = (props) => {

    const menuPage = props.pages.map((page : any) => (
        <Link to={page.url} className={`menu-page-item ${props.linkPageCurrent === page.url ? 'active' : ''}`}>{page.title}</Link>
    ));

    return (
        <div className="menu-page">
            {menuPage}
        </div>
    )
};

export default MenuPage;