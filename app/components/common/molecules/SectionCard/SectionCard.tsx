import React, { ReactNode } from 'react';
import defaultStyles from './SectionCard.css';
import Divider from '@material-ui/core/Divider';

interface SectionCardProps {
  sectionName: string,
  wrapperStyle?: React.CSSProperties,
  children?: ReactNode,
  showSubtext?: boolean,
  subtext?: string,
  showDivider?: boolean,
  onSubtextClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const SectionCard = ({ sectionName, wrapperStyle, children, showSubtext, subtext, showDivider, onSubtextClick }: SectionCardProps) => {
  const _subtext = subtext ? subtext : "More";
  const _showSubtext = showSubtext == null ? true : showSubtext;
  const _showDivider = showDivider == null ? true : showDivider;
  return (
    <div
      className={defaultStyles['wrapper']}
      style={{ ...wrapperStyle }}
    >
      <div className={defaultStyles['header']}>
        <div>{sectionName}</div>
        { _showSubtext &&
          <div
            className={defaultStyles['header-subtext']}
            onClick={onSubtextClick}
          >{_subtext}</div>
        }
      </div>
      { _showDivider &&
        <Divider style={{ margin: "10px 0" }}/>
      }
      <div>
        {children}
      </div>
    </div>
  );
}

export default SectionCard;
