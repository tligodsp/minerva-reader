import React, { useState, ReactNode } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { LibraryPageTopBar, LibraryPageRightDrawer } from '../../organisms';

import defaultStyles from './LibraryPageTemplate.css';

interface LibraryPageTemplateProps {
  children: ReactNode,
  onChangeSearchInput?: Function,
}

const LibraryPageTemplate = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className={defaultStyles['page']}
    >
      <div
        className={defaultStyles['main-display']}
      >
        <div className={defaultStyles['scroll-view-container']}>
          <Scrollbars className={defaultStyles['scroll-view']}>
            {/* SEARCH BAR */}
            <LibraryPageTopBar
              onDrawerClick={handleDrawerClick}
              // onChangeSearchInput={onChangeSearchInput}
            />
            {/* CHILDREN */}
            { children }
          </Scrollbars>
        </div>
      </div>

      {/* RIGHT DRAWER */}
      <LibraryPageRightDrawer
        open={open}
        onClose={() => {setOpen(false)}}
      />
    </div>
  );
}

export default LibraryPageTemplate;
