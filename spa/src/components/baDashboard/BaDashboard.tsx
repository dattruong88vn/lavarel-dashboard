import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getPagesPermission } from 'api/ba/baApi';
import Pipeline from './pipeline/Pipeline';
import Deals from './deals/Deals';
import Funnel from './funnel/Funnel';
import BpoBuySide from './bpoBuySide/BpoBuySide';
import MenuPage from './menuPage/MenuPage';
import { PagePermission } from 'model';

const BaDashboard: React.FC<RouteComponentProps> = (props) => {
    const [url, setUrl] = useState('');
    const [pages, setPages] = useState<PagePermission[]>([]);
    const [componentRender, setComponentRender] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const pagesPermission = await getPagesPermission();
            const url = props.history.location.pathname === '/ba-dashboard' ? pagesPermission.data.length > 0 ? pagesPermission.data[0].url : null : props.history.location.pathname;
            if (!url) {
                return;
            }
            let componentRender;
            switch (url) {
                case '/pipeline':
                    componentRender = <Pipeline />;
                    break;
                case '/deal':
                    componentRender = <Deals />;
                    break;
                case '/funnel':
                    componentRender = <Funnel />;    
                    break;
                case '/bpo-buyside':
                    componentRender = <BpoBuySide />;
                    break;
                default:
                    break;            
            }
            setUrl(url);
            setPages(pagesPermission.data);
            setComponentRender(componentRender);
        })();
    }, [props.history.location.pathname]);
    
    return (
        <>  
            <MenuPage linkPageCurrent={url} pages={pages} />  
            {componentRender}
        </>
    )
};

export default BaDashboard;