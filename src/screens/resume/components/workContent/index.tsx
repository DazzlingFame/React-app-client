import {Divider} from "../../../../components/divider";
import React, {useState} from "react";
import '../../resumeScreenStyles.css'
import WorkBlock from "./components";
import {Images, WorkTexts} from "../../constants";

const WORK_CONTENT_TYPE_KEY = 'WORK_CONTENT_TYPE_KEY';

enum ContentType {
    TESTER = 'Tablio',
    DEVELOPER = 'PhotoEditing'
}

type Props = {
    texts: WorkTexts;
}

export const WorkContent: React.FC<Props> = props => {
    const [content, setContent] = useState(localStorage.getItem(WORK_CONTENT_TYPE_KEY) || ContentType.TESTER);
    let contentTexts = props.texts.testing;
    let photosArray: Array<{source: string, desc: string}> = [];

    const navigationConfig: Array<{text: string; type: ContentType}> = [
        {text: props.texts.testing.header, type: ContentType.TESTER},
        {text: props.texts.development.header, type: ContentType.DEVELOPER},
    ];

    const onContentTabChanged = (type: ContentType) => {
        setContent(type);
        localStorage.setItem(WORK_CONTENT_TYPE_KEY, type);
    };

    const navigationLinks = navigationConfig.map(item => (
        <div className={content === item.type ?  'navigation_link_container navigation_link_container_selected' : 'navigation_link_container'} onClick={() => onContentTabChanged(item.type)}>
            <p className={'small_text'}>
                {item.text}
            </p>
        </div>
    ));

    switch (content) {
        case ContentType.DEVELOPER: {
            contentTexts = props.texts.development;
            photosArray = [
                Images.ORDERS_MAP_IMG, Images.DLIMS_IMG
            ];
            break;
        }
        case ContentType.TESTER: {
            contentTexts = props.texts.testing;
            photosArray = [Images.ALLURE_IMG, Images.E2E_STEP_IMG];
            break;
        }
    }

    return (
         <div>
             <p className={'bold_subheader_text'}>
                 {props.texts.header}
             </p>
             <div className={'navigation_container'}>
                 <div className={'navigation_links_container'}>
                     {navigationLinks}
                 </div>
                 <Divider />
             </div>
             <div className={'content_container'}>
                 <WorkBlock texts={contentTexts} photos={photosArray} />
             </div>
         </div>
    )
};
